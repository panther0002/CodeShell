const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");




const OTPschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),   //####
        expires:5*60
    },
});

//function :> to send email
async function sendVerificationEmail (email,otp){
    try {
        const mailResponse= await mailSender(email,
                                            "Verification Email from CodeShell",
                                            emailTemplate(otp));

        console.log("Email sent successfully : ",mailResponse);
        
    } catch (error) {
        console.log("error occure while sending mail : ",error);
        throw error;
    }
}

OTPschema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    

    next();
})

module.exports=mongoose.model("OTP",OTPschema);