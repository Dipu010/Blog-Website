import React from 'react'

import { BsFillPeopleFill } from "react-icons/bs";
import { IoNewspaperSharp } from "react-icons/io5";
import { GiNewspaper } from "react-icons/gi";
import { GrGallery } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";


const Sidebar = () => {
  return (
    <div className=' w-[110px] bg-[#1e293b] h-screen left-0'>


        <div className=' flex flex-col   justify-center items-center gap-[50px] pt-10'>

            <BsFillPeopleFill className=' text-[#1976d2] text-xl'/>
            <BsFillPeopleFill className=' text-[#1976d2] text-xl'/>
            <BsFillPeopleFill className=' text-[#1976d2] text-xl'/>
            <BsFillPeopleFill className=' text-[#1976d2] text-xl'/>
            <BsFillPeopleFill className=' text-[#1976d2] text-xl'/>

        </div>

        
    </div>
  )
}

export default Sidebar