import React, { useContext, useState } from "react";
import BlogOwner from "./BlogOwner";
import BlogFunctionality from "./BlogFunctionality";
import ShowComments from "./ShowComments";
import { BlogContext } from "../Context/BlogContext";
export default function BlogStructure(props) {
  const {dataArray} = useContext(BlogContext);
  const [seemore, setSeemore] = useState(0);
  const [showComments, setShowComments] = useState(0);

  return (
    <div className="">
      <div className=" box-border w-[690px] p-[20px] bg-slate-800 flex  rounded-t-md">
        <BlogOwner
          firstName={dataArray[props.i]._doc.owner.firstName}
          lastName={dataArray[props.i]._doc.owner.lastName}
          userName={dataArray[props.i]._doc.owner.userName}
          date={dataArray[props.i]._doc.createdAt}
          profilePicture ={dataArray[props.i]._doc.owner.profilePicture}
          owner_id={dataArray[props.i]._doc.owner._id}
        ></BlogOwner>
      </div>
      <div className="relative box-border w-[690px] p-[20px] bg-slate-700 flex flex-col rounded-b-md">
        <div className=" text-white text-[24px] font-semibold">
          {dataArray[props.i]._doc.title}
        </div>
        <div className=" text-white mt-[20px] font-semibold text-[16px]">
          {dataArray[props.i]._doc.summary}
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
          <div className=" text-white mt-[10px]">{dataArray[props.i]._doc.description}</div>
        ) : (
          ""
        )}
        <div className=" mt-[20px]">
          <img className=" object-fill h-[350px] w-full" src={dataArray[props.i]._doc.picture} />
        </div>
        <div className=" mt-[20px]">
          {dataArray[props.i].comments != 0 ? (
            <div
              className=" text-white cursor-pointer hover:underline ml-[550px]"
              onClick={() => {
                showComments ? setShowComments(0) : setShowComments(1);
              }}
            >
              {dataArray[props.i].comments} comments
            </div>
          ) : (
            ""
          )}
        </div>
        <div className=" box-border w-[650px] h-[2px] bg-slate-200 mt-[10px]"></div>
        <BlogFunctionality
          id={dataArray[props.i]._doc._id}
          reaction={dataArray[props.i].reaction.val}
        ></BlogFunctionality>
        {
          showComments ? <ShowComments id={dataArray[props.i]._doc._id}></ShowComments> : ""
        }
      </div>
    </div>
  );
}
