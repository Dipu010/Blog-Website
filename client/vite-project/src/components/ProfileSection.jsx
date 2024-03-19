import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export const ProfileSection = () => {
  const { id } = useParams();
  console.log("Params:", id);
  
  const[data,setData]=useState({})
  const getData=async()=>{
    const parsedData = await axios.post(
      `http://localhost:4000/api/v1/profile`,
      { userName: id },
      {
        withCredentials: true,
      }
    );
    console.log(parsedData);
    const data = parsedData.data.message.userData;
    setData(data)

  }
  useEffect(()=>{
     getData()
  },[])
  
  return (
    <div>
        {console.log(data)}
        <div className="realtive bg-gray-300 w-screen h-screen overflow-x-hidden pt-[70px]">
          <div className="relative mx-auto w-[1000px] bg-gray-500 h-[180px] text-white text-xl  rounded-sm">
            <div className=" absolute w-[200px] h-[200px] rounded-full bg-white z-10 flex justify-center items-center mt-[75px] ml-[30px]">
              <div className=" w-[190px] h-[190px] rounded-full bg-blue-500  z-10"></div>
            </div>
          </div>

          <div className="relative mx-auto w-[1000px] bg-white h-[300px] text-xl pt-[100px] pl-[40px] rounded-sm">
            <p className="  text-[32px] font-semibold text-black mb-[10px]">
              {data.firstName} {data.lastName}
            </p>
            <p className=" text-[20px] text-gray-500 font-medium">
              {data.userName}
            </p>
            <p className="text-[16px] text-gray-400">
              JU ETCE 2026 / Full-stack Developer
            </p>
            <p className=" text-blue-500 text-[16px] font-bold mb-[10px]">
              1000 connections
            </p>
            <button className="text-white bg-blue-500 px-3 py-1 rounded-lg">
              Follow
            </button>
          </div>

          <div className=" relative w-[1000px] bg-white h-[200px] text-black mx-auto mt-5 pt-[70px] pl-[50px]">
            <button className=" text-gray-500 text-bold text-xl px-2 py-1 rounded-md border-gray-500 border-2 ">
              My Posts
            </button>
          </div>
        </div>
      
    </div>
  );
};
