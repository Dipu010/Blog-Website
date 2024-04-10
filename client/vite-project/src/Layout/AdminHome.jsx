import React from "react";
import { Card } from "../adminComponents/Card";
import Example from "../adminComponents/LineGraph";
import Sidebar from "../components/dashboard/sidebar";
import NavbarAdmin from "../components/dashboard/navbar-admin";

export const AdminHome = () => {
  return (
    <div className=" h-screen w-screen bg-gray-500  grid-rows-2 overflow-y-hidden">
      
        <NavbarAdmin/>
      
        <Sidebar/>

        
      
      <div>
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
    </div>
  );
};
