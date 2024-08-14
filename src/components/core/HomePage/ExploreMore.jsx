import React, { useState } from 'react'
import HighlightText from './HighlightText'
import {HomePageExplore} from "../../../data/homepage-explore";
import CourseCard from './CourseCard';

const tabName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
];



const ExploreMore = () => {

    const [currentTab,setCurrentTab] = useState(tabName[0]);
    const [courses,setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading)

    const setMyCards= (value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter( (data) => data.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }


  return (
    <div className='mb-20 '>

        <div className='flex flex-col items-center gap-4'>

            <div className='text-4xl font-semibold text-center'>
                  Unlock the <HighlightText text={"Power of Code"}/>
            </div>
            <p className='text-richblack-300 text-base'>Learn to Build Anything You Can Imagine</p>

            <div className='flex flex-row gap-2 bg-richblack-800 rounded-full px-1 py-1'>
                {
                    tabName.map( (ele,index) =>{
                        return (
                            <div className={`text-[10px] flex flex-row items-center gap-2 rounded-full 
                                transition-all duration-200 cursor-pointer  font-semibold
                                hover:bg-richblack-900 hover:text-richblack-5 px-2 py-2
                                ${currentTab===ele ? "bg-richblack-900 text-richblack-5 scale-105  " 
                                : " text-richblack-200"}  `}  key={index}
                                onClick={()=>{
                                    setMyCards(ele);
                                }} >

                                {ele}

                            </div>
                        )
                    })
                }
            </div>
            
            <div className='lg:h-[150px] lg:mt-14'></div>

            {/* card  */}
            <div className='lg:absolute -bottom-[7%] flex lg:flex-row  flex-col w-11/12 lg:gap-8 gap-14 justify-center'>
                {
                    courses.map( (ele,index) =>{
                        return (
                            <CourseCard
                                key={index}
                                cardData={ele}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                            />
                        )
                    })
                }
            </div>

        </div>

    </div>
  )
}

export default ExploreMore