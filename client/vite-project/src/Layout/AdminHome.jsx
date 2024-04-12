import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Card } from "../adminComponents/Card";
import Example from "../adminComponents/LineGraph";
import Sidebar from "../adminComponents/dashboard/sidebar";
import { Users } from "../admin-tabs/Users/Users";

export const AdminHome = () => {
  return (
    <div className="  bg-[#131920]   flex ">
      <Sidebar />

      <div className=" flex flex-col  ml-10 gap-5">
        <p className="text-gray-300 text-5xl mt-5">Dashboard</p>

        <div className="  w-[1250px] h-[630px] mx-auto  rounded-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
