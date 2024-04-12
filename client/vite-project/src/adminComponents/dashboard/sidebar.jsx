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
    <div className=' w-[150px] bg-gray-800 h-screen  p-[20px] border-r-2 border-[#263240]'>

        <p className=' text-gray-300 text-2xl text-center font-semibold mb-7'>Admin</p>

        <div className=' flex flex-col justify-center ml-[20px]  gap-[40px] h-full w-full mt-[-150px]'>

            <div className=' flex gap-2 cursor-pointer'>
                
                <BsFillPeopleFill className=' text-[#0d6efd]  text-xl '/>
                <p className=' text-[#0d6efd] text-md font-bold mt-[-2px]'>Users</p>
                
            </div>
            <div className=' flex gap-2 text-[#0d6efd]'>
              <IoNewspaperSharp className=' text-xl'/>
              <p className='  text-md font-bold mt-[-2px]'>Alerts</p>
            </div>

            <div className=' flex gap-2 text-[#0d6efd]'>
            <FaSearch className='  text-lg'/>
            <p className=' text-md font-bold mt-[-2px]'>Search</p>
            </div>
            
            
        </div>

        <div className=' flex flex-col justify-center ml-[20px] mt-[-40px]'>
          <div className=' w-[80px] h-[80px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 '>
                <img 
                  className=' object-cover rounded-full h-[80px] w-[80px]'
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