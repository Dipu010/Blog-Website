import React from "react";
import { IoMdPerson } from "react-icons/io";
import {useNavigate} from 'react-router-dom'


export default function BlogOwner(props) {
  const navigate =useNavigate()
  return (
    <div className=" flex justify-center" >
      <div className=" box-border rounded-full bg-slate-500 h-[60px] w-[60px] flex justify-center items-center cursor-pointer">
        <img src={props.profilePicture} className=" object-contain rounded-full"/>
      </div>
      <div className=" flex flex-col ml-[15px] ">
        <div className=" font-semibold cursor-pointer text-[20px] text-white" onClick={()=>{navigate('/profile')}}>{props.firstName} {props.lastName}</div>
        <div className=" text-slate-200  cursor-pointer">Posted On {props.date.substring(0,10).toLocaleString()}</div>
      </div>
      
    </div>
  );
}
