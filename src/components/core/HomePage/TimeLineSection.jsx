import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timeLineImage from "../../../assets/Images/TimelineImage.png";

const Timeline =[
  {
    Logo:Logo1,
    Heading:"Leadership",
    Description:"Fully committed to success company",
  },
  {
    Logo:Logo2,
    Heading:"Leadership",
    Description:"Fully committed to success company",
  },
  {
    Logo:Logo3,
    Heading:"Leadership",
    Description:"Fully committed to success company",
  },
  {
    Logo:Logo4,
    Heading:"Leadership",
    Description:"Fully committed to success company",
  },
]



const TimeLineSection = () => {
  return (
    <div >
      <div className='flex flex-row gap-24 items-center pt-5'>

        {/* left box */}
        <div className='flex flex-col w-[50%] gap-5'>
            {
              Timeline.map( (element,index)=>{
                return(
                  <div className='flex flex-col' key={index}>
                  
                    <div className='flex flex-row gap-4 ' >

                      <div className='w-[50px] h-[50px]'>
                        <img src={element.Logo} alt="" />
                      </div>

                      <div className='flex flex-col '>
                        <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                        <p className='text-base '>{element.Description}</p>
                      </div>

                    </div>

                    <div className='px-2' >
                      {index < Timeline.length - 1 && (
                      <div className="vertical-dotted-line"></div>
                      )}
                    </div>

                  </div>
                )
              })
            }
        </div> 

        {/*Right Box*/}
        <div className='relative shadow-blue-200 w-[100%] z-2'>
          <img src={timeLineImage} alt='TimelineImage'
          className='object-fit '
          />

          <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 
            left-[50%] translate-x-[-50%] translate-y-[-50%]'>

              <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                <p className='text-3xl flont-bold'>10</p>
                <p className='text-carribbeangreen-300 text-sm'>Years of Exprience</p>
              </div>
              <div className='flex flex-row gap-5 items-center px-7'>
                <p className='text-3xl flont-bold'>250</p>
                <p className='text-carribbeangreen-300 text-sm'>Types Of Courses</p>
              </div>

          </div>

        </div>




      </div>     

    </div>
  )
}

export default TimeLineSection