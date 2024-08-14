import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

import { CiCircleRemove } from "react-icons/ci";
import { useState } from "react"
import { BsLightningChargeFill } from "react-icons/bs"
import { TbCornerDownRightDouble } from "react-icons/tb"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { fadeIn } from "../components/common/motionFrameVarients"
import { login } from "../services/operations/authApi"


function Login() {
  const [showDemo, setShowDemo] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>
      {/* demo */}
      <div
        className={`${
          showDemo ? "" : "hidden"
        } absolute right-[60%] top-52 z-20 -rotate-[20deg] items-center justify-center bg-transparent p-6 md:right-[50%] md:top-32  `}
      >
        <motion.div 
          variants={fadeIn("left",0.3)}
          initial="hidden"
          whileInView={"show"}
          className="relative flex flex-col gap-2  ">
          <div onClick={() => {setShowDemo(false)}}
            className="absolute right-[-20px] top-[-20px] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full text-5xl text-white "
          >
            <CiCircleRemove />

          </div>

          <div className=" flex flex-col gap-y-2 ">
            <p className="flex items-center text-2xl font-extrabold text-richblack-5 ">
              Take a Demo &nbsp; <BsLightningChargeFill className=""size={20} />
            </p>
            <div>
              <button
                onClick={() => {
                  dispatch(login("paramanikakash2@gmail.com", "123456", navigate))
                }}
                className="mb-1 mt-4 flex rounded-md px-4 py-2 font-semibold  demo"
              >
                <TbCornerDownRightDouble className="hidden text-2xl text-white md:block" />
                Click here for Instructor Demo
              </button>
            </div>

            <div>
              <button
                onClick={() => {
                  dispatch(login("pramakash6@gmail.com", "123456", navigate))
                }}
                className="flex rounded-md px-4 py-2 font-semibold  demo"
              >
                <TbCornerDownRightDouble className="hidden text-2xl text-white md:block" />
                Click here for Student Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>


      <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
    </>
    
  )
}

export default Login