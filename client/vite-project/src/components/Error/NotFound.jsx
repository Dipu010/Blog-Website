import React, { useContext } from 'react'
import './NotFound.css'
import { TfiCommentsSmiley } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/Authcontex';

export default function NotFound() {
    const data=JSON.parse(localStorage.getItem('ResPonse'))
    const {LoggedIn}=useContext(AuthContext);
  return (
    <div className=' w-screen h-screen bg-[#95c2de] flex items-center justify-center'>   
 
 <div className=" m-auto w-[800px]">
   
 <div className='flex justify-center items-center gap-4'>
 <h1 className=' text-black text-4xl text-center mb-8 font-serif'>  !! Kya Kar Raha Hai Yar Tu</h1>
 <TfiCommentsSmiley className='text-3xl text-yellow-900 mb-7 font-bold hover:text-6xl cursor-pointer '/>
 </div>
 <div className='flex justify-center items-center'>
 <div className="err  text-amber-400 ">4</div>
    <i className="far  text-gray-900 fa-question-circle fa-spin"></i>
    <div className="err2 text-green-500">4</div>
 </div>
   
    <div className="msg">Maybe this page moved? Got deleted? Maybe You Have to Login First. Please go Home for CheckOut? Never existed in the first place?<p>Let's go <Link className=' text-blue-600 hover:underline' to={ LoggedIn?`/${data.userName}/home`:'/home'}>home</Link> and try from there.</p></div>
      </div>
    </div>
  )
}
