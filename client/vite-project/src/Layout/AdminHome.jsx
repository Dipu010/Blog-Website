import React from "react";
import { Card } from "../adminComponents/Card";
import Example from "../adminComponents/LineGraph";

export const AdminHome = () => {
  return (
    <div className=" h-screen w-screen bg-gray-500 grid grid-cols-3  pt-[130px]  grid-rows-2">
      <div className="  ">
        <Card data={{ heading: "Total Users", count: "333" }} />
        
      <div className=" w-[400px] h-[350px] bg-black rounded-lg px-4  ml-10 mt-[-50px]">
        <Example />
      </div>
      </div>

      <div className="  ">
        <Card data={{ heading: "Active Users", count: "69" }} />
        <div className=" w-[400px] h-[350px] bg-black rounded-lg px-4  ml-10 mt-[-50px]">
        <Example />
      </div>

      </div>

      <div className="">
        <Card data={{ heading: "Total Blogs", count: "1,768" }} />
        <div className=" w-[400px] h-[350px] bg-black rounded-lg px-4  ml-10 mt-[-50px]">
        <Example />
      </div>
      </div>


      
      
    </div>
  );
};
