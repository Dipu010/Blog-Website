import React, { useState } from "react";
import Navbar from "../components/navbar";
import StepComplition from "./StepComplition";
import { useNavigate } from "react-router-dom";

const getLocalData = () => {
  const retriveDescription = JSON.parse(
    localStorage.getItem("blogDescription")
  );
  var retriveImage = localStorage.getItem("blogImage");
  if (retriveImage) {
    retriveImage = JSON.parse(retriveImage);
  }
  return [retriveDescription, retriveImage];
};
export default function BlogPost() {
  const retrivedData = getLocalData();
  var data =retrivedData[0][0].description
  const [show, setShow] = useState(0);
  return (
    <div>
      <Navbar></Navbar>
      <div className="w-screen bg-slate-700 flex flex-col items-center">
        <div className=" text-white text-[30px]  w-screen font-black flex justify-center items-center mt-[20px]">
          Create New Blog
        </div>
        <div className=" w-screen flex justify-center items-center mt-[20px] ml-[60px]">
          <StepComplition val={2}></StepComplition>
        </div>
        <div className="w-[700px]  box-border p-[20px] rounded-md flex flex-col bg-slate-800 justify-center items-center">
          <div className=" text-white text-[30px] font-bold">
            {retrivedData[0][0].title}
          </div>
          <div className=" text-white text-[17px] mt-[30px]">
            {retrivedData[0][0].summery}... &ensp;
            {!show ? (
              <span className=" text-slate-400 cursor-pointer" onClick={() => setShow(1)}>
                see more
              </span>
            ) : (
              ""
            )}
          </div>
          <div className=" text-white text-[17px] mt-[30px]">
            {show ? <p>{data}</p> : ""}
          </div>
          <div className="mt-[20px]">
            <img
              src={retrivedData[1][0]}
              className=" object-contain h-[400px] w-[650px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
