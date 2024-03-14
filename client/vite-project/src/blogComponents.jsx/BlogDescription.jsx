import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import StepComplition from "./StepComplition";
import {useNavigate} from "react-router-dom";
import Nav from "../components/nav";

const getLocalData = () => {
  const retrivedData = localStorage.getItem("blogDescription");
  if (retrivedData) return JSON.parse(retrivedData);
  else return [];
};
export default function BlogDescription() {
  const navigate = useNavigate();
  var retrivedData = getLocalData();
  
  if (retrivedData.length==0) {
    console.log("hello");
    retrivedData = [
      {
        title: "",
        summery: "",
        description: "",
        tags: "",
      },
    ];
  }
  const [description, setDescription] = useState({
    title: retrivedData[0].title,
    summery: retrivedData[0].summery,
    description: retrivedData[0].description,
    tags:retrivedData[0].tags,
  });

  const setLocally = () => {
    const data = [description];
    localStorage.setItem("blogDescription", JSON.stringify(data));
  };
  useEffect(() => {
    setLocally();
  }, [description]);
  const handleInput = (event) => {
    setDescription({ ...description, [event.target.name]: event.target.value });
  };
  const handleClick = ()=>{
    if(description.description=="" || description.title=="" || description.summery=="")
    {
        alert("please complete all the input Field")
    }
    else navigate("/image");
  }
  // fetch the data
  const data =JSON.parse(localStorage.getItem('ResPonse'))
  return (
    <div>
     <Nav data={data}></Nav>
      <div className=" w-screen bg-slate-700 flex flex-col items-center">
        <div className=" text-white text-[30px]  w-screen font-black flex justify-center items-center mt-[20px]">
          Create New Blog
        </div>
        <div className=" w-screen flex justify-center items-center mt-[20px] ml-[60px]">
          <StepComplition val={0}></StepComplition>
        </div>
        <div className=" box-border w-[800px]  bg-slate-800 p-[30px] rounded-md felx flex-col items-center ">
          <div className="relative flex flex-col gap-2">
            <div className="flex">
              <span className=" text-white">Blog Title</span>
              <span className=" text-red-400">*</span>
            </div>
            <input
              className="w-[100%] h-[40px] bg-slate-500 rounded-md text-white px-[10px]"
              type="text"
              placeholder="Enter Blog Title"
              name="title"
              value={description.title}
              onChange={(event) => handleInput(event)}
            />
          </div>
          <div className="relative flex flex-col gap-2 mt-[20px]">
            <div className="flex">
              <span className=" text-white">Blog Short description</span>
              <span className=" text-red-400">*</span>
            </div>
            <textarea
              className="w-[100%] h-[80px] bg-slate-500 rounded-md text-white px-[10px] "
              type="text"
              placeholder="Enter Blog Title"
              name="summery"
              value={description.summery}
              onChange={(event) => handleInput(event)}
            />
          </div>
          <div className="relative flex flex-col gap-2 mt-[20px]">
            <div className="flex">
              <span className=" text-white">Description</span>
              <span className=" text-red-400">*</span>
            </div>
            <textarea
              className="w-[100%] h-[300px] bg-slate-500 rounded-md text-white px-[10px] "
              type="text"
              placeholder="Enter Blog Title"
              name="description"
              value={description.description}
              onChange={(event) => handleInput(event)}
            />
          </div>
          <div className="relative flex flex-col gap-2 mt-[20px]">
            <div className="flex">
              <span className=" text-white">
                Topic Tags (Helpfull for classification)
              </span>
            </div>
            <textarea
              className="w-[100%] h-[40px] bg-slate-500 rounded-md text-white px-[10px] "
              type="text"
              placeholder="Enter Blog Title"
              name="tags"
              value={description.tags}
              onChange={(event) => handleInput(event)}
            />
          </div>
        </div>
        <div className="h-[40px] w-[800px] flex justify-end mt-[40px] mb-[60px]">
          <button className=" box-border px-[20px]  rounded-md  bg-yellow-400 text-black hover:bg-yellow-300" onClick={()=>handleClick()}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
