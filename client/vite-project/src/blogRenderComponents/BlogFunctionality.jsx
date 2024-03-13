import React, { useState } from "react";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
import axios from "axios";

export default function BlogFunctionality(props) {
  var reactionL;
  var reactionUL;
  if(props.reaction==1){
     reactionL=1;
     reactionUL=0;
  }
  else if(props.reaction==-1){
    reactionUL=1;
    reactionL=0;
  }
  const [like, setLike] = useState(reactionL);
  const [dislike, setDislike] = useState(reactionUL);
  const handleLike = async () => {
    if (like) setLike(0);
    else {
      setLike(1);
      setDislike(0);
    }
    const likeResult = await axios.post(
      `http://localhost:4000/api/v1/likeblog`,
      { val: 1, id: props.id },
      {
        withCredentials: true,
      }
    );
    console.log(likeResult);
  };
  const handleDislike = async () => {
    if (dislike) {
      setDislike(0);
    } else {
      setDislike(1);
      setLike(0);
    }
    const dislikeResult = await axios.post(
      `http://localhost:4000/api/v1/likeblog`,
      { val: -1, id: props.id },
      {
        withCredentials: true,
      }
    );
    console.log(dislikeResult);
  };
  return (
    <div className=" flex w-[100%]  h-[30px] mt-[20px] justify-evenly items-center">
      <BiLike
        className={
          like
            ? " text-white text-[30px]  cursor-pointer "
            : " text-black text-[30px]  cursor-pointer hover:text-white"
        }
        onClick={() => {
          handleLike(1);
        }}
      />
      <BiDislike
        className={
          dislike
            ? " text-white text-[30px]  cursor-pointer"
            : " text-black text-[30px]  cursor-pointer hover:text-white"
        }
        onClick={() => {
          handleDislike();
        }}
      />
      <FaRegCommentDots className=" text-black text-[30px] cursor-pointer hover:text-white" />
    </div>
  );
}
