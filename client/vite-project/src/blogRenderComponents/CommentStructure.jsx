import React from 'react'

export default function (props) {
  return (
    <div className=" flex justify-center items-center -ml-[50px]" >
      <div className=" box-border rounded-full bg-slate-500 h-[40px] w-[40px] flex justify-center items-center cursor-pointer">
        <img src={props.profilePicture} className=" object-contain rounded-full" onClick={()=>{navigate('/profile')}}/>
      </div>
      <div className=" flex ml-[15px] w-[500px] text-white box-border bg-slate-500 p-[5px] flex-col rounded-md">
        <div className=' font-semibold text-[16px] hover:underline cursor-pointer'>{props.firstName} {props.lastName}</div>
        <div className=' mt-[5px] text-[12px]'>{props.description}</div>
      </div>
      
    </div>
  )
}
