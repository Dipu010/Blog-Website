import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

import MyBlogStructure from './MyBlogStructure';
export default function BlogStructure() {
    const [dataArray, setDataArray] = useState([]);

    const { id } = useParams();
    console.log(id)
    console.log(dataArray);
    const getData = async () => {
      const parsedData = await axios.get(`http://localhost:4000/api/v1/myblog/${id}`, {
        withCredentials: true,
      });
      console.log(parsedData);
      setDataArray([...parsedData.data.message.response]);
    };
    useEffect(() => {
      getData();
    }, []);

    // Delete Blog
   
    //  const getDelete=async()=>{
    //   if(blogId){
    //        const data=await axios.post('http://localhost:4000/api/v1/deleteblogbyme',{blogId},{withCredentials:true});
    //        console.log(data);
    //   }
    //  }
    //  useEffect(()=>{
    //   getDelete()
    //  },[]);
  return (

    <div>
    {dataArray.length>0 ?
        dataArray.slice(0,3).map((val,index)=>{
           return  <MyBlogStructure val={val} key={index}/>
        })
        : <div className='text-2xl' > No Posts Yet. Please Do Post To Express Your Feeling</div>
    }
    </div>
  )
}