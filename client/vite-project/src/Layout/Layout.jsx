import React from 'react'
import Nav from '../components/nav'
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
