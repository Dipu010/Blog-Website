import React from 'react'

import { Outlet, useParams } from 'react-router-dom'

export const CreateBlogLayout = () => {
  const{id}=useParams()
  const dataLocal=JSON.parse(localStorage.getItem("ResPonse"))
  if(id!==dataLocal.userName)
      return(<></>)
  return (
    <Outlet/>
  )
}
