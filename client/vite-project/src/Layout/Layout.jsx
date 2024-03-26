import React, { useContext, useState } from 'react'
import Nav from '../components/navbar/nav'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/navbar'
import axios from 'axios'
import { AuthContext } from '../context/Authcontex'


export const Layout = () => {

      const {LoggedIn,setLoggedIn}=useContext(AuthContext)

      const authenticate=async()=>{

          const user=await axios.get(`http://localhost:4000/api/v1/reauthenticate`,{withCredentials:true})
          
          console.log(user)

          if(user.statusCode===200 || user.statusCode===201){
            setLoggedIn(true)
          }
      }

      
   
      const data =JSON.parse(localStorage.getItem('ResPonse'))
      
      
      if(data){
        authenticate()
        setLoggedIn(true)
      }
      
        

    
  return (
    <>
        {LoggedIn ? (<Nav data={data}></Nav>):(<Navbar/>)}
        <Outlet/>
    </>
  )
}
