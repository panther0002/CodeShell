const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const Profile=require("../models/Profile");
const mailSender=require("../utils/mailSender")
const { passwordUpdated } = require("../mail/templates/passwordUpdate")

//send otp
exports.sendOTP= async (req,res) =>{

    try {
            //1 : fetch data
            const {email}=req.body;

            //2 : check if user already exist
            const checkUserPresent=await User.findOne({email});

            // if user exist
            if(checkUserPresent){
                return res.status(401).json({
                    success:false,
                    message:"User already registered",
                })
            }

            //3 : generate OTP (Unique)
            var otp=otpGenerator.generate(6,{    //###
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            console.log("OTP generated :> ",otp);

            // make sure that otp is unique or not
            let result=await OTP.findOne({otp:otp});

            while(result){
                otp=otpGenerator(6,{
                    upperCaseAlphabets:false,
                    lowerCaseAlphabets:false,
                    specialChars:false, 
                });
                result=await OTP.findOne({otp:otp});
            }


            //4 : create an entry in db for otp
            const otpPayload={email,otp};
            const otpBody= await OTP.create(otpPayload);
            console.log(otpBody);

            //5 : return response successfull
            res.status(200).json({
                success:true,
                message:"OTP sent successfully",
                otp:otp,
            })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
    
        })
    }

}

//sign up
exports.signUp=async (req,res)=>{
    try {
        //1 :data fetch from req body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
            }=req.body;

        //2 : validate data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp ){
            return res.status(403).json({
                success:false,
                message:"All fields are required", 
            })
        }
        //3 : password match
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password values does not match ,pls check",
            });
        }

        //4 : check user already exist or not

        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user is already registered",
            });
        }
        //5 : find most recent OTP for the user
        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1); // created-1 : descendend order
        console.log("recent otp ->",recentOtp);

        //6 :validate otp
        if(recentOtp.length==0){
            //otp not found
            return res.status(400).json({
                success:false,
                message:"OTP not found",
            })
        }else if(otp!=recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"OTP not Matching",
            })
        }
        
        //7 :hash password
        const hashedPassword=await bcrypt.hash(password,10);

        //8 :entry create in DB 
        const profileDetails=await Profile.create({
            gender:null,
            dateofBirth:null,
            about:null,
            contactNumber:null
        })
        const user=await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        //9 : return res
        return res.status(200).json({
            success:true,
            message:"User is registered successfully",
            user,
        })
    } catch (error) {
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"User can not be tregistered , pls try again",
       }) ;
    }


}


//log in
exports.logIn= async (req,res)=>{
   try {
        //1 :data fectch
        console.log("log in dhuklam")
        const {email,password}=req.body;

        //2 :validation data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required , pls try again",
            })
        }
        console.log("validate holo")
        //3 : user Check
        const user=await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not regestered, pls sign up"
            })
        }
        
        console.log("password match kor6i ")
        //4 :password match and generate jwt
        if(await bcrypt.compare(password,user.password)){  //###

            //token generate by jwt :> payload create,then sign
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }

            const token=jwt.sign(payload,process.env.JWT_SECRET,{ //payload,scret key,options
                expiresIn:"2h",  
            });
            
            user.token=token;
            user.password=undefined;

            //5 :create cookies
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in SuccessFully",
            });

         }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect",
            })
         }
        

   } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Log in failure ,try again",
        })
   }
}


//change password
exports.changePassword= async (req,res)=>{
    try {
       // get data from req body 
        const {oldPassword,newPassword}=req.body;
        const userDetails=await User.findById(req.user.id);

        // Validate old password
        const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password
        )

        if (!isPasswordMatch) {
            // If old password does not match, return a 401 (Unauthorized) error
            return res
            .status(401)
            .json({ success: false, message: "The password is incorrect" })
        }


        //3 :update password in DB
        const encryptedPassword = await bcrypt.hash(newPassword, 10)
        const updatedUserDetails = await User.findByIdAndUpdate(
        req.user.id,
        { password: encryptedPassword },
        { new: true }
        )
        // Send notification email
        try {
            const emailResponse = await mailSender(
            updatedUserDetails.email,
            "Password for your account has been updated",
            passwordUpdated(
                updatedUserDetails.email,
                `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
            )
            )
            console.log("Email sent successfully:", emailResponse.response)
        } catch (error) {
        // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while sending email:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        })
        }

        //5 : return response
        return res.status(200).json({ success: true, message: "Password updated successfully" }) 

    } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
  })
}
}
