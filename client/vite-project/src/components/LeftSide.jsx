
import React,{useContext,useState,useEffect} from 'react';
import { CiEdit } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { AuthContext } from '../context/Authcontex';
import axios from 'axios';
function Leftside({data}) {
  // Dummy data for the user profile
  
  const [userData,setUserData]=useState({});
  console.log(userData);
   const getUser=async()=>{
    try {
      const response=await axios.get('http://localhost:4000/api/v1/login/success',{withCredentials:true});
      setUserData(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
   }
   useEffect(()=>{
    getUser()
   },[]);
  const profileData = {
    name: 'Apple Icecream',
    friends: 0,
    location: 'Somewhere Out There, CA',
    occupation: 'Some Degenerate',
    profileViews: '6790',
    postImpressions: '7850',
    socialProfiles: [
      { name: 'Twitter', type: 'Social Network', icon: <FaTwitter/> },
      { name: 'Linkedin', type: 'Network Platform', icon: <FaLinkedin/> },
    ],
  };
  const fullName=`${data.firstName} ${data.lastName}`;

  return (
    <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-sm">
      <div className="flex items-center space-x-4">
        <img src={data.profilePicture} alt="Profile" className="rounded-full w-14 h-14" />
        <div>
          <h1 className="text-xl font-semibold">{fullName}</h1>
          <p className="text-gray-500">{profileData.friends} friends</p>
        </div>
      </div>
      <br />
      <div className="mt-4">
      <div className='flex justify-between'>
      <CiLocationOn className=' cursor-pointer text-xl'></CiLocationOn>
        <p className="text-gray-600">{profileData.location}</p>
      </div>
       <div className='flex justify-between'>
       < FaShoppingBag className=' cursor-pointer text-xl'/>
       <p className="text-gray-600">{profileData.occupation}</p>
       </div>
      </div>
      <br />
      <div className="mt-4">
       <div className=' flex justify-between'>
       <p className="text-gray-800 font-medium text-sm">Who's viewed your profile </p>
        <p className="font-bold">{profileData.profileViews}</p>
       </div>
      <div className='flex justify-between'>
      <p className="text-gray-800 font-medium text-sm">Impressions of your post </p>
        <p className="font-bold">{profileData.postImpressions}</p>
      </div>
      </div>
      <br />
      <div className="mt-4">
        <p className="text-gray-800 font-medium">Social Profiles</p>
        <div className="mt-2 space-y-2">
          {profileData.socialProfiles.map((profile, index) => (
            <div key={index} className="flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className='flex items-center'>
                <img src={profile.icon} alt={`${profile.name} icon`} className="w-5 h-5" />
                <span className="ml-2 text-gray-800">{profile.name}</span>
                </div>
                  <CiEdit className=' cursor-pointer text-xl'></CiEdit>
              </div>
              <p className="text-gray-500 text-sm">{profile.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leftside;
