import React, { useState } from "react";
import Navbar from "../components/navbar";
import StepComplition from "./StepComplition";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const removeLocalData = () => {
  localStorage.removeItem("blogDescription");
  localStorage.removeItem("blogImage");
};
export default function BlogPost() {
  const navigate = useNavigate();
  const retrivedData = getLocalData();
  const finalData = {
    description: retrivedData[0][0].description,
    title: retrivedData[0][0].title,
    summary: retrivedData[0][0].summery,
    tags: retrivedData[0][0].tags,
    image: retrivedData[1][0],
  };
  const [loading, setLoading] = useState(0);

  const handlePost = async () => {
    setLoading(1);
    const data = await axios.post(
      `http://localhost:4000/api/v1/createblog`,
      { ...finalData },
      { withCredentials: true }
    );
    console.log(data.data.data.description);
    removeLocalData();
    navigate("/");
  };

  const [show, setShow] = useState(0);
  return (
    <div className="relative">
      {loading ? (
        <div className="absolute top-0 left-0 h-full w-full  justify-center items-center flex">
          <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
            <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={loading ?  "filter blur-lg" : "" }>
        <Navbar></Navbar>
        <div className="w-screen bg-slate-700 flex flex-col items-center pb-[70px]">
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
                <span
                  className=" text-slate-400 cursor-pointer"
                  onClick={() => setShow(1)}
                >
                  see more
                </span>
              ) : (
                <span
                  className=" text-slate-400 cursor-pointer"
                  onClick={() => setShow(0)}
                >
                  see less
                </span>
              )}
            </div>
            <div className=" text-white text-[17px] mt-[30px]">
              {show ? <p>{retrivedData[0][0].description}</p> : ""}
            </div>
            <div className="mt-[20px]">
              <img
                src={retrivedData[1][0]}
                className=" object-contain h-[400px] w-[650px]"
              />
            </div>
          </div>
          <div>
            <button
              className=" box-border px-[25px] py-[5px] rounded-md bg-purple-600 text-white mt-[30px] ml-[620px]"
              onClick={() => {
                handlePost();
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

