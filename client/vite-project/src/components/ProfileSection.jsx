import React from 'react'

export const ProfileSection = () => {
  return (
    <div className=' bg-black w-screen h-screen pt-[70px]'>

        <div className='relative mx-auto w-[1000px] bg-gray-500 h-[180px] text-white text-xl '>
                Hello World
        </div>

        <div className=' absolute w-[200px] h-[200px] rounded-full bg-white ml-[280px] mt-[-120px] z-10'></div>
        <div className=' absolute w-[190px] h-[190px] rounded-full bg-blue-500 ml-[285px] mt-[-110px] z-10'></div>

        <div className='relative mx-auto w-[1000px] bg-white h-[278px] text-xl pt-[100px] pl-[40px]'>
               <p className='  text-2xl font-semibold text-black '>Diptarshi Das</p>
        </div>

    </div>
  )
}
