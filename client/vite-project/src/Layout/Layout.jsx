import React, { Suspense, useContext, useEffect, useState } from 'react'
import Nav from '../components/navbar/nav'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar/navbar'
import axios from 'axios'
import { AuthContext } from '../context/Authcontex'


export const Layout = () => {
      console.log("Layout")
      const navigate=useNavigate()

      const {LoggedIn,setLoggedIn}=useContext(AuthContext)

      const data =JSON.parse(localStorage.getItem('ResPonse'))

      const authenticate=async()=>{

          console.log("Calling authenticate function")
          const user=await axios.get(`http://localhost:4000/api/v1/reauthenticate`,{withCredentials:true})
         
          
          console.log(user)

          if(user.status===200 || user.statusCode===201){
            setLoggedIn(true)
            
            navigate(`/${data.userName}/home`)
            console.log(LoggedIn)
          }
          else{
            setTimeout(()=>{
              navigate(`home`)
            },0)
          }
          console.log(LoggedIn)
        
      }


      
   
      
      
      
      useEffect(()=>{
        
          authenticate()
       
          
      },[LoggedIn])

      console.log(LoggedIn)
      
      
      
        

    
  return (
    <>
        {LoggedIn ? (<Nav data={data}></Nav>):(<Navbar/>)}
        <Outlet/>
    </>
  )
}
