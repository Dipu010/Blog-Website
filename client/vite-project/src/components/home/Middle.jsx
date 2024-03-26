import React, { useContext, useState, useEffect } from "react";
import { IoIosCreate } from "react-icons/io";
// import {FaEarthAsia} from 'react-icons/fa'
// import {LiaBlogSolid} from 'react-icons/lia'
import { LiaBlogSolid, LiaGgCircle } from "react-icons/lia";
import { FaEarthAsia, FaVolumeHigh } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Render from "../../blogRenderComponents/Render";
import RandomBlogRender from "../randomblog/RandomBlogRender"
import { MyBlogContext } from "../../context/myBlogContex";

import MyBlogRender from "../myblog/MyBlogRender";
import { BlogContext } from "../../context/BlogContext";
import { AuthContext } from "../../context/Authcontex";
// import { set } from "mongoose";

export default function Middle({ data }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const {LoggedIn}=useContext(AuthContext)
  console.log(userData);
  const { click, setClick } = useContext(MyBlogContext);
  const [show, setShow] = useState(null);
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
  // Search Blog Method
  const { dataArray, setDataArray } = useContext(BlogContext);
  const [result, setResult] = useState([]);
  const [input, setInput] = useState({ tags: "" });
  // console.log(result)
  const[response,setResponse]=useState([]);
  const allTags = result.reduce((acc, post) => [...acc, ...post._doc.tags], []);
  // const uniqueTags = Array.from(new Set(allTags.map(tag => tag.label))).map(label => {
  //   return allTags.find(tag => tag.label === label);
  // });
 
  const handleChange = (event) => {
    setResult([]);
    setIsDropdownVisible(false)
    event.preventDefault();
    setInput({ ...input, [event.target.name]: event.target.value });
      
    const filteredTags = allTags.filter(tag => 
      tag.label.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log(filteredTags)
    setResponse([filteredTags]);
    getData();
  }
  // console.log(response);
  // const jsonObject = response?response.map(JSON.stringify):'';
  // const uniqueSet = new Set(jsonObject);
  // const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
  // console.log(uniqueArray);
  const getData = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/searchblog', { ...input }, { withCredentials: true });
      console.log(response);
      setResult([...response.data.message.response]);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(result) 
 
  useEffect(() => {
    getData()
  }, [input]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  return (
    <div>
      <div className="flex  flex-col gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm mt-[80px]">

        <div className="flex items-center justify-between gap-10">
          <div className="flex items-center">
            <p onClick={() => navigate(`/${data.userName}/createblog`)} className="cursor-pointer">
              Create Blogs
            </p>
            <IoIosCreate className="h-6 w-6 text-gray-500 mx-2 cursor-pointer" />
          </div>
          <div className="flex items-center">
            <p
              className={` ${show == 1 ? 'px-3 font-bold py-1 bg-cyan-700  text-yellow-100' : 'text-black'} cursor-pointer px-3 py-1 rounded-md`}
              onClick={() => {
                setClick(0)
                setShow(1)
              }}
            >
              All Blogs
            </p>
            <FaEarthAsia className="h-6 w-6 text-gray-500 mx-2 cursor-pointer" />
          </div>
          <div className="flex items-center">
            <p
              className={` ${show == 2 ? 'px-3 py-1 bg-cyan-700 font-bold text-yellow-100' : 'text-black'} cursor-pointer hover:bg-neutral-700 px-3 py-1 rounded-md`}
              onClick={() => {
                setClick(1)
                setShow(2)
              }}
            >
              My Blogs
            </p>
            <LiaBlogSolid className="h-6 w-6 text-gray-500 mx-2 cursor-pointer" />
          </div>
        </div>
      </div>
      {
        LoggedIn ? (click==0? <Render/>:<MyBlogRender/> ) :(<RandomBlogRender/>)
      }
    </div>
  );
}
