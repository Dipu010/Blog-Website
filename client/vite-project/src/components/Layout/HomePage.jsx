import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Nav from '../nav'

export const HomePage = () => {

  const {id}=useParams()
  console.log(id)
  


    const data =JSON.parse(localStorage.getItem('ResPonse'))

  return (
    <>
        <Nav data={data}/>
        <Outlet/>
    </>
    
  )
}
