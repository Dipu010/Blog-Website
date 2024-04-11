import React, { useEffect, useState } from 'react'
import { Hero } from './hero-section/hero'
import axios from 'axios'


export const Users = () => {

    const [dataUserGraph,setDataUserGraph]=useState([])
    const [loading,setLoading]=useState(false)

    const dataUser=async()=>{
        try{
            const data=await axios.get("http://localhost:4000/api/v1/admin/showUserData")
            setDataUserGraph(data.data.data.arr)
            setLoading(true)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
       dataUser();
       


    },[])
    console.log(dataUserGraph)
      const data=[
          {
            "id": "Total Users",
            "color": "hsl(210, 79%, 46%)",
            "data":dataUserGraph
          }
      
        ]
      
  return (

    <div className=' h-full w-full flex flex-col bg-gray-700 rounded-xl' >

        <p className=' text-gray-300 text-3xl text-center font-bold '>Total Users</p>
        {loading? <Hero data={data}/>:<></> }
        
   </div>
  )
}
