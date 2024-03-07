import React from "react";

export default function StepComplition(props) {
  return (
    <div className="w-[600px] h-[100px] flex flex-col justify-center items-center">
      <div className="w-[400px] flex items-center">
        <div
          className={
            props.val >= 1
              ? " box-border rounded-full  bg-yellow-400 text-white h-[30px] w-[30px] flex justify-center items-center"
              : " box-border rounded-full bg-slate-500 text-slate-400 h-[30px] w-[30px] flex justify-center items-center"
          }
        >
          1
        </div>
        <div
          className={
            props.val >= 1
              ? " box-border h-[3px] w-[130px] bg-yellow-400"
              : " box-border h-[3px] w-[130px] bg-slate-500"
          }
        ></div>
        <div
          className={
            props.val == 2
              ? " box-border rounded-full  bg-yellow-400 text-white h-[30px] w-[30px] flex justify-center items-center"
              : " box-border rounded-full bg-slate-500 text-slate-400 h-[30px] w-[30px] flex justify-center items-center"
          }
        >
          2
        </div>
        <div
          className={
            props.val == 2
              ? " box-border h-[3px] w-[130px] bg-yellow-400"
              : " box-border h-[3px] w-[130px] bg-slate-500"
          }
        ></div>
        <div className=" box-border rounded-full bg-slate-500 text-slate-400 h-[30px] w-[30px] flex justify-center items-center">
          3
        </div>
      </div>
      <div className="flex w-[500px] justify-start gap-[60px]">
        <div className=" text-white">Blog description</div>
        <div className=" text-white">Picture Upload </div>
        <div className=" text-white ml-[30px]">Post</div>
      </div>
    </div>
  );
}
