import React from 'react'
import { useEffect, useState } from "react"
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
import { motion } from 'framer-motion'
import { fadeIn, } from './../components/common/motionFrameVarients';


// background random images
import backgroundImg1 from '../assets/Images/random bg img/coding bg1.jpg'
import backgroundImg2 from '../assets/Images/random bg img/coding bg2.jpg'
import backgroundImg3 from '../assets/Images/random bg img/coding bg3.jpg'
import backgroundImg4 from '../assets/Images/random bg img/coding bg4.jpg'
import backgroundImg5 from '../assets/Images/random bg img/coding bg5.jpg'
import backgroundImg6 from '../assets/Images/random bg img/coding bg6.jpeg'
import backgroundImg7 from '../assets/Images/random bg img/coding bg7.jpg'
import backgroundImg8 from '../assets/Images/random bg img/coding bg8.jpeg'
import backgroundImg9 from '../assets/Images/random bg img/coding bg9.jpg'
import backgroundImg10 from '../assets/Images/random bg img/coding bg10.jpg'
import backgroundImg111 from '../assets/Images/random bg img/coding bg11.jpg'


const randomImges = [
    backgroundImg1,
    backgroundImg2,
    backgroundImg3,
    backgroundImg4,
    backgroundImg5,
    backgroundImg6,
    backgroundImg7,
    backgroundImg8,
    backgroundImg9,
    backgroundImg10,
    backgroundImg111,
];


const Home = () => {
    // get background random images
    const [backgroundImg, setBackgroundImg] = useState(null);

    useEffect(() => {
        const bg = randomImges[Math.floor(Math.random() * randomImges.length)]
        setBackgroundImg(bg);
    }, [])

  return (
    <div className=''>

        {/* Section 1 */}
        <div className='relative '>
             {/* background */}
            <div className="w-full h-screen absolute top-0 left-0 opacity-[0.3] overflow-hidden object-cover z-10">
                    <img src={backgroundImg} alt="Background"
                        className="w-full h-full object-cover "
                    />

                    
            </div>

            <div className='relative h-screen mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-center z-20'>
                {/* 1st link */}
                <Link to={"/signup"}>
                            <div className='z-0 group p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                                            transition-all duration-200 hover:scale-95 w-fit'>
                                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                                transition-all duration-200 group-hover:bg-richblack-900'>
                                    <p>Become an Instructor</p>
                                    <FaArrowRight />
                                </div>
                            </div>

                </Link>

                <motion.div
                    variants={fadeIn('left', 0.1)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='text-center text-3xl lg:text-4xl font-semibold mt-7  '
                >
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"} />
                </motion.div>

                <motion.div
                    variants={fadeIn('right', 0.1)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className=' mt-4 w-[90%] text-center text-base lg:text-lg font-bold text-richblack-300'
                >
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </motion.div>

                {/* 2 button */}
                <div className='flex flex-row gap-7 mt-8'>
                    <CTAbutton active={true} linkto={"/signup"}>
                    Learn More
                    </CTAbutton>

                    <CTAbutton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAbutton>
                </div>
            </div>

        </div>

        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>

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
            <div className='hidden lg:block homepage-bg h-[333px]'>

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
            <motion.div 
                variants={fadeIn("up",0.2)}
                initial="hidden"
                whileInView={"show"}
                
            className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

                <div 
                
                className='flex flex-row gap-10 mx-auto mt-[90px] mb-10'>

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

            </motion.div>



        </div>

        {/* Section 3 */}
        <div 
            
            className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
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