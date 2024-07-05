import React from 'react'

const IconBTN = ({text,onclick,children,disable,outline=false,customClasses,type}) => {
  return (
    <button disabled={disable} onClick={onclick} type={type} className="bg-blue-400 py-[8px] px-[20px]" >
        {
            children ? (
               <>
               <span >
                    {text}
                </span>
                {children}
               </>
            ) : (text)
        }
    </button>
  )
}

export default IconBTN