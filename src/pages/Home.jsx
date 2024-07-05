import React from 'react'
import { FaArrowRight} from "react-icons/fa6";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAbutton from '../components/core/HomePage/CTAbutton';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
  return (
    <div className=''>
        {/* Section 1 */}

        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>

            {/* 1st link */}
            <Link to={"/signup"}>

                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                    transition-all duration-200 hover:scale-95 w-fit'>

                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>

                </div>

            </Link>
            {/* heading */}
            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your future with 
                <HighlightText text={"Coding Skill"}/>
            </div>

            {/* subheading */}
            <div className='w-[90%] text-richblack-300 mt-4 text-center text-lg '>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>
            {/* 2 button */}
            <div className='flex flex-row gap-7 mt-8'>
                <CTAbutton active={true} linkto={"/signup"}>
                Learn More
                </CTAbutton>

                <CTAbutton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAbutton>
            </div>

            {/* video */}
            <div className='mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                <video
                muted loop autoPlay
                > <source src={Banner}/>
                </video>
            </div>

            {/* core section 1 */}
            <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-bold'>
                            Unlock your 
                            <HighlightText text={"coding potential "}/>
                            with our online courses.
                        </div>
                    }
                    subHeading={
                        " Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctaBtn1={
                        {
                            btnText:"Try It Yourself",
                            linkto:"/signup",
                            active: true,
                        }
                    }
                    ctaBtn2={
                        {
                            btnText:"Learn More",
                            linkto:"/login",
                            active: false,
                        }
                    }
                    codeblock={
                        `<!DOCTYPE html>
                        <html>
                        head><title>Example
                        </title><linkrel="stylesheet"href="styles.css">
                        /head>
                        body>
                        h1><ahref="/">Header</a>
                        /h1>
                        nav><ahref="one/">One</a><ahref="two/">Two</ 
                        a><ahref="three/">Three</a>
                        /nav>`
                    }
                    codeColor={"text-yellow-25"}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                />
            </div>

            {/* core section 2 */}
            <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-bold'>
                            Start
                            <HighlightText text={"coding in seconds"}/>
                        </div>
                    }
                    subHeading={
                        " Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctaBtn1={
                        {
                            btnText:"Try It Yourself",
                            linkto:"/signup",
                            active: true,
                        }
                    }
                    ctaBtn2={
                        {
                            btnText:"Learn More",
                            linkto:"/login",
                            active: false,
                        }
                    }
                    codeblock={
                        `<!DOCTYPE html>
                        <html>
                        head><title>Example
                        </title><linkrel="stylesheet"href="styles.css">
                        /head>
                        body>
                        h1><ahref="/">Header</a>
                        /h1>
                        nav><ahref="one/">One</a><ahref="two/">Two</ 
                        a><ahref="three/">Three</a>
                        /nav>`
                    }
                    codeColor={"text-blue-100"}
                    backgroundGradient={<div className="codeblock2 absolute"></div>}
                />
            </div>

            
            <ExploreMore/>
           

        </div>

        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>

            {/* bg image + 2 button */}
            <div className='homepage-bg h-[333px]'>

                <div className='h-[250px]'></div>
                <div className='flex justify-center items-center  gap-4'>
                    <CTAbutton active={true} linkto={"/signup"} >
                        <div className='flex gap-2 items-center '>
                            Explore Full Catalog
                            <FaArrowRight/>
                        </div>
                    </CTAbutton>

                    <CTAbutton active={false} linkto={"/login"}>
                        Learn More
                    </CTAbutton>

                </div>

            </div>
                {/* get the skill */}
            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

                <div className='flex flex-row gap-10 mx-auto mt-[90px] mb-10'>

                    <div className='text-4xl font-bold w-[50%]'>
                        Get the skills you need for a 
                        <HighlightText text={"job that is in demand."}/>
                    </div>

                    <div className='w-[40%] flex flex-col gap-10 items-start '>
                        <div className='text=[16px]'>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAbutton active={true} linkto={"./signup"} className='w-[12px]'>Learn More </CTAbutton>
                    </div>

                </div>
                
                <TimeLineSection/>

                <LearningLanguageSection/>

            </div>



        </div>

        {/* Section 3 */}
        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
            {/* Become a instructor section */}
            <InstructorSection />

            {/* Reviws from Other Learner */}
            <h1 className="text-center text-4xl font-semibold mt-8">
            Reviews from other learners
            </h1>
        </div>

        <div className='px-2'>
            <ReviewSlider/>
        </div>

        {/* Footer */}
        
        <Footer/> 

    </div>
  )
}

export default Home