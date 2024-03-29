import React from 'react'
import './Card.css'
import Example from './LineGraph'

export const Card = ({data}) => {
  return (
    
    <div className=' w-[400px] h-[200px] bg-black rounded-lg pt-7  ml-10'>
        <div className=' h-[48px] font-bold text-2xl text-white  w-full  flex justify-center items-center'>
            <p className=' '>{data.heading}</p>
        </div>

        <div className=' h-[130px]  w-full flex justify-center items-center '>
                <p className='font-bold text-[50px] text-white'>{data.count}</p>

        </div>

        

    

        

    </div>
  )
}
