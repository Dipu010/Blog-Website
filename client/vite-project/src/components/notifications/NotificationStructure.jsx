import React from 'react'

export default function (props) {
    
  return (
    <div className=' box-border rounded-md w-[370px] p-[15px] mt-[5px] mb-[5px]  hover:bg-slate-600 cursor-pointer'>
        <div className=' text-white'>{props.message}</div>
    </div>
    
    
  )
}
