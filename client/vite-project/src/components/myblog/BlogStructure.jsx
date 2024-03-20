import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { FcLike } from "react-icons/fc";
export default function BlogStructure() {
    const [loading, setLoading] = useState(1);
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
  return (

    <div>
    {
        dataArray.slice(0,3).map((val)=>{
           return  <div>
             <div className=' flex gap-6 mt-6'>
                <img src={val._doc.picture} className='w-[200px] rounded-lg'/>
                 <div> {val._doc.title}</div>
            </div>
            <div className='flex justify-between mr-6'>
               <div className='flex gap-3'>
               <FcLike className='mt-2 text-xl'></FcLike>
               <div className=' mt-[6px]'> {val.likes} Likes</div>
               </div>
               <div className='mr-6 text-cyan-400'>
                {val.comments} Comments
               </div>
            </div>
            <hr  className='mt-6 mr-6'/>
           </div>
        })
    }
    </div>
  )
}