import React, { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";

export default function CommentInput(props) {
  const textAreaRef = useRef(null);
  const [val, setVal] = useState("");
  const handleChange = (event) => {
    setVal(event.target.value);
  };

  useEffect(() => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [val]);

  const handleSubmit = async () => {
    const response = await axios.post(
      `http://localhost:4000/api/v1/commentblog`,
      { description: val, id: props.id },
      {
        withCredentials: true,
      }
    );
    console.log(response);
    props.setComment(0);
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center gap-3">
      <textarea
        className="w-[600px] bg-slate-500 rounded-sm text-white px-[10px] active:outline-none focus:outline-none p-2"
        type="text"
        placeholder="Add a comment"
        value={val}
        onChange={(event) => handleChange(event)}
        rows="1"
        ref={textAreaRef}
      />
      <div>
        <FaPaperPlane
          className=" text-white text-[20px] cursor-pointer"
          onClick={() => {
            handleSubmit();
          }}
        />
      </div>
    </div>
  );
}
