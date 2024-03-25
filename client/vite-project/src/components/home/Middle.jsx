import React, { useContext, useState, useEffect } from "react";
import { IoIosCreate } from "react-icons/io";
// import {FaEarthAsia} from 'react-icons/fa'
// import {LiaBlogSolid} from 'react-icons/lia'
import { LiaBlogSolid, LiaGgCircle } from "react-icons/lia";
import { FaEarthAsia, FaVolumeHigh } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Render from "../../blogRenderComponents/Render";
import { MyBlogContext } from "../../context/myBlogContex";

// import { MyBlogContext } from '../context/myBlogContex';
import MyBlogRender from "../myblog/MyBlogRender";
import { BlogContext } from "../../context/BlogContext";
// import { set } from "mongoose";

export default function Middle({ data }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
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
      <div className="flex  flex-col gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm mt-[40px]">
        <div className="flex  p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={data.profilePicture || userData?.profilePicture} // Replace with the path to your profile image
            alt="Your Name"
          />
          <input
            type="text"
            className="flex-1 p-2 text-sm  focus:ring-0 border-white px-10 py-3 rounded-full"
            placeholder="What Kind of Genre You Want to Watch"
            onChange={(event) => {
              event.preventDefault();
              handleChange(event);
              setIsDropdownVisible(event.target.value.length > 0)
            }}
            name="tags"
            value={input.tags}
          />
          
          {isDropdownVisible && (
            <div className=" absolute top-[200px] left-[370px] right-[460px] z-10 border border-gray-200 bg-gray-800 overflow-auto mt-1 rounded-lg shadow">
              {result.length > 0 ?
                (
                  
                  result.map((item, index) => {
                  
                    return <div
                      key={index}
                      className="p-2 hover:bg-gray-600 cursor-pointer"
                    // onClick={
                    //  setIsDropdownVisible(false)}  
                    >
                      
                      <div className="flex">
                        {
                          item._doc.tags?.map((index,tag)=>{
                            const value=input.tags.slice(0,1)==index.value.slice(0,1)
                           var result=''
                            if(value){
                              result=index.value
                            }
                          console.log(index);
                            return <div  key={tag}  className=" text-yellow-100 ml-6 mt-2 text-[16px]">
                         {result}
                            </div>
                          })
                        }
                      </div>
                    </div>
                  })
                ) : (

                  (<div className="p-2 text-gray-500">No results found.</div>)
                )}
            </div>
          )}
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
      {!click ? (
        <Render />
      ) : (
        <MyBlogRender />
      )}
    </div>
  );
}
