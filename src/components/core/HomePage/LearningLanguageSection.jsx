import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_otheers from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAbutton from './CTAbutton';


const LearningLanguageSection = () => {
  return (
    <div className=' my-[130px]'>
      <div className='flex flex-col gap-5 mx-auto items-center'>
        <div className='text-4xl font-bold text-center'>
        Your swiss knife from
        <HighlightText text={" learning any language"}/>
        </div>

        <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[60%]'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row justify-center mt-5 w-[11/12] px-12'>
          <img 
            src={know_your_progress}
            alt='know your progress'
            className='object-contain -mr-32'
          />
          <img 
            src={compare_with_otheers}
            alt='compare with others'
            className='object-contain -mr-36'
          />
          <img 
            src={plan_your_lesson}
            alt='plan your lesson'
            className='object-contain'
          />
        </div>

        <div className=' w-fit'>
          <CTAbutton active={true} linkto={"./signup"} >
            Learn More
          </CTAbutton>
        </div>

      </div>
    </div>
  )
}

export default LearningLanguageSection