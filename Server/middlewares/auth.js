const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");


//auth : json web token verify kori mainly
exports.auth=async (req,res,next)=>{
    try{
        //1 :extract token
        console.log("here in backend")
        const token=req.cookies.token 
                    || req.body.token 
                    || req.header("Authorization").replace("Bearer ","");  //####
        //if token missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing..........."
                
            });
        }

        console.log("token pelam",token);
        //2 :verify token
        try {
            const decode= jwt.verify(token,process.env.JWT_SECRET); 
            console.log("after verifying token ->",decode);

            req.user=decode; 
        //## ekhane email,role ,used-id sob gelo jegulo cookies er madhhome dhuki6ilom log in korar somai

        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"token is invalid",
                message:error.message
            });
        }

        console.log("token valid sona")
        next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }
}

//isStudent
exports.isStudent=async (req,res,next) =>{
    try {
        //check 
        if(req.user.accountType!="Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for students"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"User role can not be verified"
        });
    }
}

//isInstructor
exports.isInstructor=async (req,res,next) =>{
    try {
        //check 
        if(req.user.accountType!="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for instructors"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"User role can not be verified"
        });
    }
}

//isAdmin
exports.isAdmin=async (req,res,next) =>{
    try {
        //check 
        if(req.user.accountType!="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admins"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"User role can not be verified"
        });
    }
}