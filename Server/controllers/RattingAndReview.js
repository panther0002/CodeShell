const RattingAndReview=require("../models/RattingAndReview");
const Course=require("../models/Course");
const {mongoose } = require("mongoose");

//create ratting 
exports.createRatting=async (req,res)=>{
    try {
       // fetch user id
       console.log("elam");
       const userId=req.user.id;

       //fetch data from req body
       const {ratting,review,courseId}=req.body;

       console.log("course find korbo")


       //check if user is enrolled or not###################
       const courseDetails=await Course.findOne(
                                                {_id:courseId,
                                                    studentsEnrolled:{$elemMatch:{$eq:userId}},
                                                });
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Students is not enrolled in this course",
            })
        }
        console.log("ratting review create korbo erpr")
       //check if user is already review this course 
       const alreadyReviewed=await RattingAndReview.findOne(
                                                        {
                                                          user:userId,
                                                          course:courseId, 
                                                        }
       );
       if(alreadyReviewed){
        return res.status(403).json({
            success:false,
            message:"Course is already reviewed",
        })
       }
       //create ratting and review

       const rattingReview=await RattingAndReview.create({
        ratting,
        review,
        user:userId,
        course:courseId,
       });
       console.log("create korlam ratting")
       //update in course 
       const updatedCourse=await Course.findByIdAndUpdate({_id:courseId},
                                                        {
                                                            $push:{
                                                                ratingAndReviews:rattingReview._id,
                                                            }
                                                        },
                                                        {new:true}
                                                    );
        console.log(updatedCourse);

       //return response
       return res.status(200).json({
        success:true,
        message:"Ratting and review created successfully",
        
       })
       
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"something went wrong while creating ratting and review",
            error:error.message
        })
    }
}


//get avg ratting
exports.getAverageRatting=async (req,res)=>{
    try {
        //fetch course id
        const {courseId}=req.body.courseId;

        //calculate average ratting
        const result=await RattingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRatting:{$avg:"$ratting"}
                }
            }
        ])
        //return ratting 
        if(result.length >0){
            return res.status(200).json({
                success:true,
                averageRatting:result[0].averageRatting,
            })
        }
        //no ratting and review
        return res.status(400).json({
            success:false,
            message:"Average ratting is zero , no ratting till now",
            averageRatting:0,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"something went wrong while getting average ratting",
            error:error.message
        })
    }
}


//get all ratting 
exports.getAllRatting =async (req,res)=>{
    try {
        const allReview=await RattingAndReview.find({})
                                              .sort({ratting:"desc"})
                                              .populate({
                                                path:"user",
                                                select:"firstName lastName email image"
                                              })
                                              .populate({
                                                path:"course",
                                                select:"courseName",
                                              })
                                              .exec();
    
        return res.status(200).json({
            success:true,
            message:" all reviews fetch successfully",
            data:allReview
        })                                     
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"all review are not fetched",
            error:error.message
        })
    }
}