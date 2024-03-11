import React from "react";
import { IoMdPerson } from "react-icons/io";

export default function BlogOwner(props) {
  return (
    <div className=" flex justify-center">
      <div className=" box-border rounded-full bg-slate-500 h-[60px] w-[60px] flex justify-center items-center cursor-pointer">
        <IoMdPerson className=" rounded-full text-[40px] text-white" />
      </div>
      <div className=" flex flex-col ml-[15px] ">
        <div className=" font-semibold cursor-pointer text-[20px] text-white">{props.firstName} {props.lastName}</div>
        <div className=" text-slate-200  cursor-pointer">Posted On {props.date.substring(0,10)}</div>
      </div>
      
    </div>
  );
}
