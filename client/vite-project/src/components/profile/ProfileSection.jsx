import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogStructure from "../myblog/BlogStructure";
import { MyBlogContext } from "../../context/myBlogContex";
import { IoIosCreate } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ProfileSection = (props) => {
  const { click, setClick } = useContext(MyBlogContext);
  
  const [show, setShow] = useState(null);
  const { id } = useParams();
  console.log("Params:", id);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const getData = async () => {
    const parsedData = await axios.post(
      `http://localhost:4000/api/v1/profile/${id}`,
      { userName: id },
      {
        withCredentials: true,
      }
    );
    console.log("first")
    console.log(parsedData);
    const data = parsedData.data.message.userData;
    setData(data);
    setFollow(parsedData.data.message.followData.isFollowing);
    
  };

  const owner_id = data._id;
  const [follow, setFollow] = useState(false);

  const handleClick = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/v1/follow",
      { followingID: owner_id },
      { withCredentials: true }
    );
    console.log(response);
    if (response.data.message.data.val) setFollow(true);
    else setFollow(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {console.log(data)}
      <div className="realtive bg-gray-300 w-screen h-screen overflow-x-hidden pt-[70px]">
        <div className="relative mx-auto w-[1000px] bg-gray-500 h-[180px] text-white text-xl  rounded-sm">
          <div className=" absolute w-[200px] h-[200px] rounded-full bg-white z-10 flex justify-center items-center mt-[75px] ml-[30px]">
            <div className=" w-[190px] h-[190px] rounded-full bg-blue-500  z-10">
              <img
                src={data.profilePicture}
                className=" w-[190px] h-[190px] rounded-full bg-blue-500  z-10"
                alt=""
              />
            </div>
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
          <button
            className="text-white bg-blue-500 h-[50px] w-[150px] rounded-lg"
            onClick={() => {
              handleClick();
            }}
          >
            {follow ? "Following" : "Follow"}
          </button>
        </div>

        <div className=" w-[1000px]  bg-gray-700 h-[130vh] text-gray-50 mx-auto mt-5 pt-[70px] pl-[50px]">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-bold text-2xl rounded-md font-bold mt-2 text-gray-50">
                Activites
              </p>
              <p className=" text-blue-500">500 followers</p>
            </div>
            <div className="flex gap-[-1]">
              <button
                className=" px-4 py-1 rounded-full text-xl border-2 mr-8 bg-blue-500 text-black"
                onClick={() => navigate("/blog")}
              >
                {" "}
                Create a Post{" "}
              </button>
              <IoIosCreate className=" text-4xl" />
            </div>
          </div>
          <div className=" flex gap-3 mt-5">
            <button
              className={`${
                show == 1 ? " bg-green-500" : "bg-transparent"
              } px-4 rounded-full border-2 border-white text-[18px]`}
              onClick={() => setShow(1)}
            >
              {" "}
              Posts
            </button>
            <button
              className={` ${
                show == 2 ? "bg-green-500" : "bg-transparent"
              } px-4 rounded-full border-2 border-white text-[18px]`}
              onClick={() => setShow(2)}
            >
              {" "}
              Comments
            </button>
          </div>
          <BlogStructure />
          <button
            type="button"
            className=" w-full border-2 border-gray-300 rounded-2xl px-24 py-2 mt-8 mr-7 font-bold text-2xl ml-[-10px] hover:bg-slate-900"
            onClick={() => {
              setClick(1);
              navigate(`/${data.userName}/home`);
            }}
          >
            {" "}
            Show All Post
          </button>
        </div>
      </div>
    </div>
  );
};
