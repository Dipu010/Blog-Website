import React, { useState } from "react";
import BlogOwner from "./BlogOwner";
import BlogFunctionality from "./BlogFunctionality";
export default function BlogStructure(props) {
const [seemore, setSeemore] = useState(0);

  return (
    <div className="">
      <div className=" box-border w-[750px] p-[20px] bg-slate-800 flex flex-row rounded-t-md">
        <BlogOwner
          firstName={props.firstName}
          lastName={props.lastName}
          userName={props.userName}
          date={props.date}
        ></BlogOwner>
      </div>
      <div className="relative box-border w-[750px] p-[20px] bg-slate-700 flex flex-col rounded-b-md">
        <div className=" text-white text-[24px] font-semibold">
          {props.title}
        </div>
        <div className=" text-white mt-[20px] font-semibold text-[18px]">
          {props.summary}
          <br />
          {!seemore ? (
            <span
              className=" cursor-pointer font-bold"
              onClick={() => {
                setSeemore(1);
              }}
            >
              ...see more
            </span>
          ) : (
            <span
              className=" cursor-pointer font-bold"
              onClick={() => {
                setSeemore(0);
              }}
            >
              &nbsp;&nbsp; see less
            </span>
          )}
        </div>
        {seemore ? (
          <div className=" text-white mt-[10px]">{props.description}</div>
        ) : (
          ""
        )}
        <div className=" mt-[20px]">
          <img
            className=" object-fill h-[450px] w-[780px]"
            src={props.image}
          />
        </div>
        <BlogFunctionality id={props.id} reaction={props.reaction}></BlogFunctionality>
        
      </div>
    </div>
  );
}
