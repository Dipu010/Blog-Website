import React from 'react'
import Nav from '../components/navbar/nav'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
   
      const data =JSON.parse(localStorage.getItem('ResPonse'))

    
    
  return (
    <>
        <Nav data={data}></Nav>
        <Outlet/>
    </>
  )
}
