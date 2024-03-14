import React, { useEffect, useState } from 'react'
import axios from 'axios';
export const ProfileSection = () => {
  const data = JSON.parse(localStorage.getItem("ResPonse"));
  const [loading, setLoading] = useState(1);
  const [dataArray, setDataArray] = useState([]);
  console.log(dataArray);
  const getData = async () => {
    const parsedData = await axios.get(`http://localhost:4000/api/v1/myblog`, {
      withCredentials: true,
    });
    console.log(parsedData);
    setLoading(0);
    setDataArray([...parsedData.data.message.posts]);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {
        loading ? (
          <div className="absolute top-0 left-0 h-screen w-screen  justify-center items-center flex bg-black">
            <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
              <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
            </div>
          </div>
        ) : <div className='realtive bg-gray-300 w-screen h-screen overflow-x-hidden pt-[70px]'>

          <div className='relative mx-auto w-[1000px] bg-gray-500 h-[180px] text-white text-xl  rounded-sm'>
            <div className=' absolute w-[200px] h-[200px] rounded-full bg-white z-10 flex justify-center items-center mt-[75px] ml-[30px]'>
              <div className=' w-[190px] h-[190px] rounded-full bg-blue-500  z-10'></div>
            </div>
          </div>




          <div className='relative mx-auto w-[1000px] bg-white h-[300px] text-xl pt-[100px] pl-[40px] rounded-sm'>
            <p className='  text-[32px] font-semibold text-black mb-[10px]'>{data.firstName} {data.lastName}</p>
            <p className=' text-[20px] text-gray-500 font-medium'>{data.userName}</p>
            <p className='text-[16px] text-gray-400'>JU ETCE 2026 / Full-stack Developer</p>
            <p className=' text-blue-500 text-[16px] font-bold mb-[10px]'>1000 connections</p>
            <button className='text-white bg-blue-500 px-3 py-1 rounded-lg'>Follow</button>

          </div>

          <div className=' relative w-[1000px] bg-white h-[200px] text-black mx-auto mt-5 pt-[70px] pl-[50px]'>

            <button className=' text-gray-500 text-bold text-xl px-2 py-1 rounded-md border-gray-500 border-2 '>My Posts</button>

          </div>

        </div>
      }
    </div>
  )
}
