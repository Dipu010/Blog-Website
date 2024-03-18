import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../nav'

export const HomePage = () => {

    const data =JSON.parse(localStorage.getItem('ResPonse'))

  return (
    <>
        <Nav data={data}/>
        <Outlet/>
    </>
    
  )
}
