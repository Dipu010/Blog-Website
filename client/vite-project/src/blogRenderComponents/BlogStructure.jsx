import React, { useState } from "react";
import BlogOwner from "./BlogOwner";
import BlogFunctionality from "./BlogFunctionality";
import ShowComments from "./ShowComments";
export default function BlogStructure(props) {
  const [seemore, setSeemore] = useState(0);
  const [showComments, setShowComments] = useState(0);

  return (
    <div className="">
      <div className=" box-border w-[690px] p-[20px] bg-slate-800 flex flex-row rounded-t-md">
        <BlogOwner
          firstName={props.firstName}
          lastName={props.lastName}
          userName={props.userName}
          date={props.date}
          profilePicture ={props.profilePicture}
        ></BlogOwner>
      </div>
      <div className="relative box-border w-[690px] p-[20px] bg-slate-700 flex flex-col rounded-b-md">
        <div className=" text-white text-[24px] font-semibold">
          {props.title}
        </div>
        <div className=" text-white mt-[20px] font-semibold text-[16px]">
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
          <img className=" object-fill h-[350px] w-full" src={props.image} />
        </div>
        <div className=" mt-[20px]">
          {props.comments != 0 ? (
            <div
              className=" text-white cursor-pointer hover:underline ml-[550px]"
              onClick={() => {
                showComments ? setShowComments(0) : setShowComments(1);
              }}
            >
              {props.comments} comments
            </div>
          ) : (
            ""
          )}
        </div>
        <div className=" box-border w-[650px] h-[2px] bg-slate-200 mt-[10px]"></div>
        <BlogFunctionality
          id={props.id}
          reaction={props.reaction}
        ></BlogFunctionality>
        {
          showComments ? <ShowComments id={props.id}></ShowComments> : ""
        }
      </div>
    </div>
  );
}
