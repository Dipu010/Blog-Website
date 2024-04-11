import React from 'react'

import { BsFillPeopleFill } from "react-icons/bs";
import { IoNewspaperSharp } from "react-icons/io5";
import { GiNewspaper } from "react-icons/gi";
import { GrGallery } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { FaSearch } from "react-icons/fa";
import adminLogo from "../../assets/admin.jpeg"



const Sidebar = () => {
  return (
    <div className=' w-[150px] bg-gray-700 h-screen  p-[20px]'>

        <p className=' text-gray-300 text-2xl text-center font-semibold mb-7'>Admin</p>

        <div className=' flex flex-col justify-center ml-[20px]  gap-[40px] h-full w-full mt-[-150px]'>

            <div className=' flex gap-2 cursor-pointer'>
                
                <BsFillPeopleFill className=' text-[#1976d2] text-xl '/>
                <p className=' text-[#1976d2] text-md font-bold mt-[-2px]'>Users</p>
                
            </div>
            <div className=' flex gap-2'>
              <IoNewspaperSharp className=' text-[#1976d2] text-xl'/>
              <p className=' text-[#1976d2] text-md font-bold mt-[-2px]'>Alerts</p>
            </div>

            <div className=' flex gap-2'>
            <FaSearch className=' text-[#1976d2] text-lg'/>
            <p className=' text-[#1976d2] text-md font-bold mt-[-2px]'>Search</p>
            </div>
            
            
        </div>

        <div className=' flex flex-col justify-center ml-[20px] mt-[-40px]'>
          <div className=' bg-slate-300 rounded-full w-[70px] h-[70px] '>
                <img 
                  className=' object-cover rounded-full h-[70px] w-[70px]'
                  src={adminLogo}
                  alt='photo'
                />
          </div>
          <p className=' text-gray-300 text-md font-bold mt-5'>Diptarshi</p>
        </div>

        
    </div>
  )
}

export default Sidebar