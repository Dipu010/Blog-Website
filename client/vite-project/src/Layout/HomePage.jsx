import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Nav from '../components/navbar/nav'

export const HomePage = () => {

  const {id}=useParams()
  console.log(id)
  


    const data =JSON.parse(localStorage.getItem('ResPonse'))

  return (
    <>
        
        <Outlet/>
    </>
    
  )
}
