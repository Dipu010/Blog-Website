import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Reroute = () => {
    const navigate=useNavigate()
    const dataLocal=JSON.parse(localStorage.getItem("ResPonse"))

    const authenticate=async()=>{
        console.log("In Reroute")
        const response=await axios.get(`http://localhost:4000/api/v1/reauthenticate`,{withCredentials:true})
        console.log(response)
        if(response.data.statusCode===200){
                console.log("Status code 200")
                navigate(`/${dataLocal.userName}/home`)
        }
        if(response.data.statusCode===201){
            console.log("Status code 201")
            navigate(`/${dataLocal.userName}/home`)
    }

         

    }

    authenticate()
    

    
  return (
    <div>Reroute</div>
  )
}
