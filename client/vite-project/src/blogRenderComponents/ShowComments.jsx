import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import CommentStructure from "./CommentStructure";
export default function ShowComments(props) {
  const [LoadMore,setLoadMore]= useState(0);
  const [loading, setLoading] = useState(1);
  const [commentArray, setCommentArray] = useState([]);
  const val = useRef(0);
  console.log(commentArray);


  const getComment = async () => {
    const parsedComment = await axios.post(
      `http://localhost:4000/api/v1/getcomment`,
      { id: props.id, no: val.current },
      {
        withCredentials: true,
      }
    );
    setLoading(0);
    setCommentArray([...commentArray,...parsedComment.data.message.result]);
  };


  useEffect(() => {
    getComment();
  }, [LoadMore]);

  const loadMore = ()=>{
    val.current=val.current+1;
    setLoading(1);
    setLoadMore(LoadMore+1);
  }


  return (
    <>
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-pulse rounded-full bg-gray-500 h-12 w-12 "></div>
          <div className="space-y-2">
            <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[200px]">
              {" "}
            </div>
            <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[170px]">
              {" "}
            </div>
          </div>
        </div>
      ) : (
        <div className=" mt-[40px] flex flex-col gap-6">
          {commentArray.map((val) => {
            return (
              <CommentStructure
                description={val.description}
                profilePicture={val.user.profilePicture}
                firstName={val.user.firstName}
                key={val._id}
                lastName={val.user.lastName}
              />
            );
          })}
          <button className=" box-border bg-inherit px-2 w-[180px] rounded-md py-1 hover:bg-slate-500 cursor-pointer text-white font-semibold"
          onClick={()=>{loadMore()}}
          >
            Load More Comments
          </button>
        </div>
      )}
    </>
  );
}
