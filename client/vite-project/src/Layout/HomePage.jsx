import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Nav from '../components/navbar/nav'

export const HomePage = () => {

  const dataLocal =JSON.parse(localStorage.getItem('ResPonse'))
  const {id}=useParams()

  
  
  


    

    
  return (
    <>
        
        <Outlet/>
    </>
    
  )
}
