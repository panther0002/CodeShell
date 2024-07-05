const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {courseEnrollmentEmail,} = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")


// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req.body
  const userId = req.user.id
  console.log("capturepaymen e dhuklam")
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0

  for (const course_id of courses) {
    let course
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)
      console.log("course find")
      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId);
      console.log("userid check ",uid)
      if (course.studentsEnrolled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }

      // Add the price of the course to the total amount
      total_amount += course.price
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }

  try {
    // Initiate the payment using Razorpay
    console.log("order create")
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }
      console.log("Updated course: ", enrolledCourse)

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      })
      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}










                    //by webhook : this is for only one order

//capture the payment and initiate razorpay order
// exports.capturePayment=async (req,res)=>{
//     //1 : get course id and use id
//     const {course_id}=req.body;
//     const userId=req.user.id;

//     //2 :validation
//     //valid course id 
//     if(!course_id ){
//         return res.status(400).json({
//             success:false,
//             message:"pls provide valid course id"
//         })
//     }
//     //valid course details
//     let course;
//     try {
//         course=await Course.findById(course_id);
//         if(!course){
//             return res.status(400).json({
//                 success:false,
//                 message:"could not find the course"
//             }) 
//         }
//         //user already pay for the course or not 
//         const uid=new mongoose.Types.ObjectId(userId);  //userid k object type convert korlo 
//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(400).json({
//                 success:false,
//                 message:"Students is already enrolled"
//             }) 
//         }
       
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:error.message, 
//         })
//     }
//      //3 : order create 
//      const amount=course.price;
//      const currency="INR";

//      const options={   //#####
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             course_id:course_id,
//             userId,
//         }
//      };
//      try {
//         //initiate the payment using razorpay
//         const paymentResponse=await instance.orders.create(options);  //#####
//         console.log(PaymentResponse);
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,

//         })
//      } catch (error) {
//         console.log(error),
//         res.json({
//             success:false,
//             message:"Could not initiate the order"
//         })
//      }  
// }

//verify signature of Razorpay and server [after capturing]
// exports.verifySignature=async (req,res)=>{
//     try {
//         //server e j scret a6e seta r razorpay jeta pathiye6e seta milate hbe
//         const webhookSecret="123456";  //etake razorpay te jemon scret encryption ho66e serom kore match korbo signature er 7e 
        
//         const signature=req.header["x-razorpay-signature"];

//         const shasum=crypto.createHmac("sha256",webhookSecret) // hashed based msg authentication code  H>W : checksum
//         shasum.update(JSON.stringify(req.body));
//         const digest=shasum.digest('hex'); // hexadecimal formating onetype

//         if(signature===digest){
//             console.log("payment is autharised");
//             //courseid and userid
//             const {courseId,userId}=req.body.payload.entity.notes;

//             try {
//                 //enroll the student 

//                 // find the course and enroll the students in it
//                 const enrolledCourse=await Course.findByIdAndUpdate(
//                                                                     {_id:courseId},
//                                                                     {$push:{studentsEnrolled:userId}},
//                                                                     {new:true},
//                 );

//                 if(!enrolledCourse){
//                     return res.status(500).json({
//                         success:false,
//                         message:"course not found",
//                     })
//                 }
//                 console.log("enrolledCourse",enrolledCourse);

//                 //find the student and add the course

//                 const enrolledStudent=await User.findByIdAndUpdate(
//                                                                    {_id:userId},
//                                                                    {$push:{courses:courseId}},
//                                                                    {new:true}, 
//                 )

//                 //confirmation mailsend 
//                 const emailResponse=await mailSender(
//                                                     enrolledStudent.email,
//                                                     "Congratulation",
//                                                     `you enrolled the course successfully ${enrolledCourse.courseName} successfully`

//                 );
//                 console.log("email response ",emailResponse);
//                 return res.status(200).json({
//                     success:true,
//                     message:"signature verified and course added"
//                 })



//             } catch (error) {
//                 console.log(error);
//                 return res.status(500).json({
//                     success:false,
//                     message:error.message,
//                 })
//             }
//         }

//         else{
//             return res.status(400).json({
//                 success:false,
//                 message:"invalid request",
//             })
//         }

//     } catch (error) {
        
//     }
// }
