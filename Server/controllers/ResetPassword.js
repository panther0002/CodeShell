const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcryptjs");
const crypto=require("crypto");


//reset password token
exports.resetPasswordToken=async (req,res)=>{
    try {
        //1 :fetch data
        const {email}=req.body;
        //2 :check user of this email or validation
        const user=User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"ur email is not registered"
            })
        }
        //3 :generate token
        const token=crypto.randomBytes(20).toString("hex"); //####### generate 20 bytes , convert it into hexadecimal in 1 byte contain 2 hexadecimal number .. thus 40 character )

        //4 :update user by adding token and expiring time
         const updatedDetails=await User.findOneAndUpdate({email:email},
                                                    {
                                                        token:token,
                                                        resetPasswordExpires:Date.now()+5*60*1000,
                                                    },
                                                    {new:true});
        
        console.log("updated details ->>>" ,updatedDetails);
        //5 :create url
        const url=`http://localhost:3000/update-password/${token}`;

        //6 :send mail containing url
        await mailSender(email,
                        "Password Reset Link",
                        `Your Link for email verification is ${url}. Please click this url to reset your password.`
        )

        // response
        return res.json({
            success:true,
            message:"Email sent successfully for reset password"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong while reset password",
            message:error.message
        })
    }
}

//reset password
exports.resetPassword=async (req,res)=>{
    try {
        // data fetch
        const {password,confirmPassword,token}=req.body;  //token take frontend body te dhuki diye6e
        //validation
        if(password!==confirmPassword){
            return res.json({
                success:false,
                message:"password and confirmpassword not matching",
            })
        }
        //get user details from db using token
        const userDetail=await User.findOne({token:token});
        //if no entry : invalid token
        if(!userDetail){
            return res.json({
                success:false,
                message:"token not matching",
            })
        }
        // token time check
        if(userDetail.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"token expires pls regenerate data",
            })
        }
        //hash password
        const hashedPassword=await bcrypt.hash(password,10);

        // password update
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        );
        //return response
        return res.status(200).json({
            success:true,
            message:"password reset successfully"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong while reset password"
        })
    }
}