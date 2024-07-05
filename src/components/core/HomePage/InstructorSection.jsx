import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAbutton from './CTAbutton'
import { FaArrowRight} from "react-icons/fa6";


const InstructorSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-20 items-center '>
            <div className='w-[50%]'>
                <img
                    src={Instructor}
                    alt="Instructor"
                    className='shadow-white'
                />
            </div>

            <div className='flex flex-col gap-5 '>
                <div className='text-4xl font-semibold w-[40%]'>
                    Become an 
                    <HighlightText text={"instructor"}/>

                </div>

                <p className='text-richblack-300 font-medium text-[16px] w-[70%]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

                <div className='w-fit'>
                    <CTAbutton active={true} linkto={"/signup"}>
                        <div className='flex flex-row gap-2 items-center'>
                            Start learning Today 
                            <FaArrowRight/>
                        </div>
                    </CTAbutton>
                </div>
            </div>
        </div>

        

    </div>
  )
}

export default InstructorSection