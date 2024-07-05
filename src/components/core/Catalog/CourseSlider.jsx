import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper/modules'

import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {
  return (
    <>
        {Courses?.length ? (
            <Swiper
                slidesPerView={1} //Sets the number of slides to be shown per view. Initially, only one slide is visible.
                spaceBetween={25} //Sets the space between each slide in pixels.
                loop={true}
                autoplay={{
                delay: 3000, // Delay between slides in milliseconds
                disableOnInteraction: true, // Continue autoplay after user interactions
                }}
                modules={[Autoplay,FreeMode, Pagination]} //Specifies the modules used in the Swiper instance
                breakpoints={{   //responsive
                    1024: {
                    slidesPerView: 2,
                    },
                }}
                className="max-h-[30rem]"
                >
                {Courses?.map((course, i) => (
                    <SwiperSlide key={i}>
                        <Course_Card course={course} Height={"h-[250px]"} />
                    </SwiperSlide>
                ))}

            </Swiper>
            
        ) : (
            <p className="text-xl text-richblack-5">No Course Found</p>
        )}
    </>
  )
}

export default CourseSlider
