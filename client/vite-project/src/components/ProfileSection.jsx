import React from 'react'

export const ProfileSection = () => {
  return (
    <div className=' bg-gray-300 w-screen h-screen pt-[70px]'>

        <div className='relative mx-auto w-[1000px] bg-gray-500 h-[180px] text-white text-xl  rounded-sm'>
               
        </div>

        <div className=' absolute w-[200px] h-[200px] rounded-full bg-white ml-[280px] mt-[-120px] z-10'></div>
        <div className=' absolute w-[190px] h-[190px] rounded-full bg-blue-500 ml-[285px] mt-[-115px] z-10'></div>

        <div className='relative mx-auto w-[1000px] bg-white h-[300px] text-xl pt-[100px] pl-[40px] rounded-sm'>
               <p className='  text-[32px] font-semibold text-black mb-[10px]'>Diptarshi Das</p>
               <p className=' text-[20px] text-gray-500 font-medium'>@Diptarshi</p>
               <p className='text-[16px] text-gray-400'>JU ETCE 2026 / Full-stack Developer</p>
               <p className=' text-blue-500 text-[16px] font-bold mb-[10px]'>1000 connections</p>
               <button className='text-white bg-blue-500 px-3 py-1 rounded-lg'>Follow</button>
               
        </div>

        <div className=' relative w-[1000px] bg-white h-[200px] text-black mx-auto mt-5 pt-[70px] pl-[50px]'>

        <button className=' text-gray-500 text-bold text-xl px-2 py-1 rounded-md border-gray-500 border-2 '>My Posts</button>
                
        </div>

    </div>
  )
}
