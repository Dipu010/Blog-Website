import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FcLike } from "react-icons/fc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useParams } from 'react-router-dom';
export default function MyBlogStructure({ val }) {
    const data=JSON.parse(localStorage.getItem("ResPonse"));
    const [click, setClick] = useState(false);
    const [blogId, setBlogId] = useState(null);
    const [Loading, setLoading] = useState(false);
    // Delete Blog
    const handleClick = () => {
        setBlogId(val._doc._id)
        setLoading(true);
        window.location.reload();
    }
    const getDelete = async () => {
        if (blogId) {
            const data = await axios.post('http://localhost:4000/api/v1/deleteblogbyme', { blogId }, { withCredentials: true });
            console.log(data);
        }
    }
    useEffect(() => {
        getDelete()
    }, [blogId]);
    return (
        <div>
            {Loading ? <div className="flex items-center space-x-2">
                <div className="animate-pulse rounded-full bg-gray-500 h-12 w-12 "></div>
                <div className="space-y-2">
                    <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[200px]">
                        {" "}
                    </div>
                    <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[170px]">
                        {" "}
                    </div>
                </div>
            </div> :
                <div>
                    <div className=' flex justify-between gap-6 mt-6'>
                        <img src={val._doc.picture} className='w-[200px] rounded-lg' />
                        <div> {val._doc.title}</div>
                        <div className='flex flex-col gap-4'>
                           {console.log(val._doc.owner.userName)}
                            {data.userName == val._doc.owner.userName ? <RiDeleteBin6Line onClick={() => {
                                setClick(true);
                            }
                            } className='text-xl mr-6 cursor-pointer hover:shadow-xl'/>:''}

                            {
                                click && <div className='w-[325px] px-4 py-2 rounded-lg shadow-lg bg-white mr-5'>
                                    <p className='w-[300px] text-gray-800'>
                                        Would you really Want to Delete the Blog!!
                                        It can't get Back...
                                    </p>
                                    <div className=' flex justify-center items-center gap-5 mt-5 w-[300px]'>
                                        {console.log(blogId)}
                                        <button type='button' onClick={() => handleClick()} className=' text-yellow-100  bg-blue-600 px-6 py-1 rounded-full'> Yes</button>
                                        <button type='button' onClick={() => setClick(false)} className=' text-yellow-100  bg-blue-600 px-6 py-1 rounded-full'> No</button>
                                    </div>
                                </div>
                            }
                        </div>
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
                    <hr className='mt-6 mr-6' />
                </div>
            }

        </div>
    )
}
