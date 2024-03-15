import React, { useEffect, useState } from "react";
import axios from "axios";
export default function ShowComments(props) {
  const [loading, setLoading] = useState(1);
  const [commentArray, setCommentArray] = useState([]);
  console.log(commentArray);
  const getComment = async () => {
    const parsedComment = await axios.post(
      `http://localhost:4000/api/v1/getcomment`,
      { id: props.id, no: 0 },
      {
        withCredentials: true,
      }
    );
    setLoading(0);
    setCommentArray([...parsedComment.data.message.result]);
  };
  useEffect(() => {
    getComment();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-pulse rounded-full bg-gray-500 h-12 w-12 "></div>
          <div className="space-y-2">
            <div class="animate-pulse rounded-md bg-gray-500 h-4 w-[200px]">
              {" "}
            </div>
            <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[170px]">
              {" "}
            </div>
          </div>
        </div>
      ) : (
        <div>
            
        </div>
      )}
    </>
  );
}
