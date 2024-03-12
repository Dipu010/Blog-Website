// import styled from "styled-components";
// import { AuthContext } from "../context/Authcontex";
// import { useContext, useEffect,useState } from "react";
// import axios from "axios";
// const Leftside = (props) => {
 
// //    const logout = ()=>{
// //     window.open("http://localhost:4000/api/v1/logout","_self")
// // }
//   return (
//     <Container>
//       <ArtCard>
//         <UserInfo>
//           <CardBackground />
//           <a>
//        <img src={data.profilePicture || userData?.profilePicture} alt="" className=" w-[72px] h-[72px] box-border bg-clip-content shadow-none bg-white bg-center bg-no-repeat border-white border-2 border-solid rounded-full mt-[-38px] mr-auto ml-auto mb-3" />
//             <Link>Welcome, there!</Link>
//           </a>
//           <a>
//             <AddPhotoText>Add a photo</AddPhotoText>
//           </a>
//         </UserInfo>
//         <Widget>
//           <a>
//             <div>
//               <span>Connections</span>
//               <span>Grow your network</span>
//             </div>
//             <img src="/images/widget-icon.svg" alt="" />
//           </a>
//         </Widget>
//         <Item>
//           <span>
//             <img src="/images/item-icon.svg" alt="" />
//             My Items
//           </span>
//         </Item>
//       </ArtCard>

//       <CommunityCard>
//         <a>
//           <span>Groups</span>
//         </a>
//         <a>
//           <span>
//             Events
//             <img src="/images/plus-icon.svg" alt="" />
//           </span>
//         </a>
//         <a>
//           <span>Follow Hashtags</span>
//         </a>
//         <a>
//           <span>Discover more</span>
//         </a>
//       </CommunityCard>
//     </Container>
//   );
// };

// const Container = styled.div`
//   grid-area: leftside;
// `;

// const ArtCard = styled.div`
//   text-align: center;
//   overflow: hidden;
//   margin-bottom: 8px;
//   background-color: #fff;
//   border-radius: 5px;
//   transition: box-shadow 83ms;
//   position: relative;
//   border: none;
//   box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
// `;

// const UserInfo = styled.div`
//   border-bottom: 1px solid rgba(0, 0, 0, 0.15);
//   padding: 12px 12px 16px;
//   word-wrap: break-word;
//   word-break: break-word;
// `;

// const CardBackground = styled.div`
//   background: url("https://raw.githubusercontent.com/CleverProgrammers/cp-linkedin-clone/f014d361d787029f15ea0f0f78c053d8c214f138/public/images/card-bg.svg");
//   background-position: center;
//   background-size: 462px;
//   height: 54px;
//   margin: -12px -12px 0;
// `;



// const Link = styled.div`
//   font-size: 16px;
//   line-height: 1.5;
//   color: rgba(0, 0, 0, 0.9);
//   font-weight: 600;
// `;

// const AddPhotoText = styled.div`
//   color: #0a66c2;
//   margin-top: 4px;
//   font-size: 12px;
//   line-height: 1.33;
//   font-weight: 400;
// `;

// const Widget = styled.div`
//   border-bottom: 1px solid rgba(0, 0, 0, 0.15);
//   padding-top: 12px;
//   padding-bottom: 12px;

//   & > a {
//     text-decoration: none;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 4px 12px;

//     &:hover {
//       background-color: rgba(0, 0, 0, 0.08);
//     }

//     div {
//       display: flex;
//       flex-direction: column;
//       text-align: left;
//       span {
//         font-size: 12px;
//         line-height: 1.333;
//         &:first-child {
//           color: rgba(0, 0, 0, 0.6);
//         }
//         &:nth-child(2) {
//           color: rgba(0, 0, 0, 1);
//         }
//       }
//     }
//   }

//   svg {
//     color: rgba(0, 0, 0, 1);
//   }
// `;

// const Item = styled.a`
//   border-color: rgba(0, 0, 0, 0.8);
//   text-align: left;
//   padding: 12px;
//   font-size: 12px;
//   display: block;
//   span {
//     display: flex;
//     align-items: center;
//     color: rgba(0, 0, 0, 1);
//     svg {
//       color: rgba(0, 0, 0, 0.6);
//     }
//   }

//   &:hover {
//     background-color: rgba(0, 0, 0, 0.08);
//   }
// `;

// const CommunityCard = styled(ArtCard)`
//   padding: 8px 0 0;
//   text-align: left;
//   display: flex;
//   flex-direction: column;
//   a {
//     color: black;
//     padding: 4px 12px 4px 12px;
//     font-size: 12px;

//     &:hover {
//       color: #0a66c2;
//     }

//     span {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//     }

//     &:last-child {
//       color: rgba(0, 0, 0, 0.6);
//       text-decoration: none;

//       border-top: 1px solid #d6cec2;
//       padding: 12px;
//       &:hover {
//         background-color: rgba(0, 0, 0, 0.08);
//       }
//     }
//   }
// `;

// export default Leftside;
import React,{useContext,useState,useEffect} from 'react';
import { CiEdit } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { AuthContext } from '../context/Authcontex';
function Leftside() {
  // Dummy data for the user profile
  const {data}=useContext(AuthContext);
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
