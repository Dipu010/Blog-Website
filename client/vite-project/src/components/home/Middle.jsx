import React, { useContext, useState, useEffect } from "react";
import { IoIosCreate } from "react-icons/io";
// import {FaEarthAsia} from 'react-icons/fa'
// import {LiaBlogSolid} from 'react-icons/lia'
import { LiaBlogSolid } from "react-icons/lia";
import { FaEarthAsia } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Render from "../../blogRenderComponents/Render";
import { MyBlogContext } from "../../context/myBlogContex";

// import { MyBlogContext } from '../context/myBlogContex';
import MyBlogRender from "../myblog/MyBlogRender";

export default function Middle({ data }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  console.log(userData);
  const { click, setClick } = useContext(MyBlogContext);
  const [show,setShow]=useState(null);
  // For Google Login
  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/login/success",
        { withCredentials: true }
      );
      setUserData(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <div className="flex  flex-col gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm mt-[40px]">
        <div className="flex  p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={data.profilePicture || userData?.profilePicture} // Replace with the path to your profile image
            alt="Your Name"
          />
          <input
            className="flex-1 p-2 text-sm border-none focus:ring-0"
            placeholder="What Kind of Genre You Want to Watch"
          />
        </div>
        <div className="flex items-center justify-between gap-10">
          <div className="flex items-center">
            <p onClick={() => navigate(`/${data.userName}/createblog`)} className="cursor-pointer">
              Create Blogs
            </p>
            <IoIosCreate className="h-6 w-6 text-gray-500 mx-2 cursor-pointer" />
          </div>
          <div className="flex items-center">
            <p
              className={` ${ show==1? 'px-3 font-bold py-1 bg-cyan-700  text-yellow-100': 'text-black'} cursor-pointer px-3 py-1 rounded-md`}
              onClick={() => {setClick(0)
                 setShow(1)}}
            >
              All Blogs
            </p>
            <FaEarthAsia className="h-6 w-6 text-gray-500 mx-2 cursor-pointer" />
          </div>
          <div className="flex items-center">
            <p
              className={` ${ show==2? 'px-3 py-1 bg-cyan-700 font-bold text-yellow-100': 'text-black'} cursor-pointer hover:bg-neutral-700 px-3 py-1 rounded-md`}
              onClick={() =>{ setClick(1)
                 setShow(2)
                }}
            >
              My Blogs
            </p>
            <LiaBlogSolid className="h-6 w-6 text-gray-500 mx-2 cursor-pointer" />
          </div>
        </div>
      </div>
      {!click ? (
        <Render/>
      ) : (
        <MyBlogRender />
      )}
    </div>
  );
}
