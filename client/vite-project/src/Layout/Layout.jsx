import React, { useState } from 'react'
import Nav from '../components/navbar/nav'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/navbar'
import axios from 'axios'


export const Layout = () => {

      const authenticate=async()=>{

          const user=await axios.get(`http://localhost:4000/api/v1/reauthenticate`,{withCredentials:true})
          
          console.log(user)

          setLogin(true) 

          

      }

      const [login,setLogin]=useState(false)
   
      const data =JSON.parse(localStorage.getItem('ResPonse'))
      
      
      if(data){
        authenticate()
      }
        

    
  return (
    <>
        {login ? (<Nav data={data}></Nav>):(<Navbar/>)}
        <Outlet/>
    </>
  )
}
