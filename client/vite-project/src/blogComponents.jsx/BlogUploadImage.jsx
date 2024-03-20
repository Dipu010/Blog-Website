import React, { useEffect, useState } from "react";
import StepComplition from "./StepComplition";

import {useNavigate} from "react-router-dom";

const getLocalData = () => {
    const retrivedData = localStorage.getItem("blogImage");
    if (retrivedData) return JSON.parse(retrivedData);
    else return [];
  };


export default function BlogUploadImage() {

  const navigate = useNavigate();
  var retrivedData = getLocalData();
  if(retrivedData.length==0){
    retrivedData=[undefined]
  }
  const [selectedFile, setSelectedFile] = useState(retrivedData[0]);
 
  const setLocal=()=>{
    const data = JSON.stringify([selectedFile]);
    localStorage.setItem("blogImage",data);
  }
  useEffect(()=>{
    setLocal();
  },[selectedFile])

 
  const onSelectFile = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.onload = ()=>{
      const imgURL = reader.result;
      setSelectedFile(imgURL)
    }
    reader.readAsDataURL(image);
  };
  
  const handleClick = ()=>{
    if(selectedFile==undefined) alert("Upload an image");
    else navigate("/post")
  }
  const data=JSON.parse(localStorage.getItem("ResPonse"));
  return (
    <div>
      
      <div className=" w-screen bg-slate-700 flex flex-col items-center">
        <div className=" text-white text-[30px]  w-screen font-black flex justify-center items-center mt-[20px]">
          Create New Blog
        </div>
        <div className=" w-screen flex justify-center items-center mt-[20px] ml-[60px]">
          <StepComplition val={1}></StepComplition>
        </div>

        <div class="flex items-center justify-center w-full h-[600px] bg-slate-700">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64  rounded-lg cursor-pointer bg-slate-700 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-slate-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6 bg-slate-700">
              {selectedFile ? (
                <img
                  src={selectedFile}
                  className=" object-contain h-[400px] w-[500px]"
                />
              ) : (
                <svg
                  class="w-8 h-8 mb-4 text-white dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
              )}
              <p class="mb-2 text-sm text-white dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-white dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              onChange={(e) => onSelectFile(e)}
            />
            <button className=" bg-purple-700 text-white box-border px-[20px] py-[3px] mt-[20px] rounded-md hover:bg-white hover:text-purple-700"
            onClick={()=>{handleClick()}}>
              Upload
            </button>
          </label>
        </div>
      </div>
    </div>
  );
}
