import React,{ useState,useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { BlogContext } from "../../context/BlogContext";

const Rightside = (props) => {
  const {dataArray,setDataArray}=useContext(BlogContext);
  const [loading,setLoading]=useState(true);
  const [click,setClick]=useState(null);
// Get All tags 
const [tags,setTags]=useState([]);
const [selectTag,setSelectTag]=useState('');
const getAllTags=async()=>{
const response=await axios.get("http://localhost:4000/api/v1/tags",{withCredentials:true})
console.log(response);
setTags([...response.data.message.tags]);
setLoading(false);
}
useEffect(()=>{
  setTimeout(() => {
    getAllTags()
  }, 3000);
},[]);
console.log(tags);

const [result,setResult]=useState([]);
const getData = async () => {
  if(selectTag){
  
    const response = await axios.post('http://localhost:4000/api/v1/searchblog', { tags:selectTag}, { withCredentials: true });
    console.log(response);
    setResult([...response.data.message.response]);
    setDataArray([...response.data.message.response])
}
console.log(dataArray)
}
//  const handleClick=(e,searchString)=>{
//      e.preventDefault();
//      getData(searchString);
//  }
useEffect(() => {

    getData()

}, [selectTag]);
console.log(result) 
  return (
    <Container className="mt-[100px]">
      <FollowCard className=" bg-gray-700">
        <Title>
          <h2 className=" text-gray-300"> Some Popular Blog Genre/#tags</h2>
          <img  className='text-gray-200'src="https://raw.githubusercontent.com/CleverProgrammers/cp-linkedin-clone/f014d361d787029f15ea0f0f78c053d8c214f138/public/images/feed-icon.svg" alt="" />
        </Title>
         
            <div className=" grid grid-cols-3 mt-8">
           { loading?(
        <div className="absolute top-0 left-0 h-screen w-screen  justify-center items-center flex bg-black">
          <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
            <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
          </div>
        </div>
      ): tags. map((index,val)=>{
              console.log(index)
              console.log(val)
             return <div key={val} className={`${click===index.label? 'bg-blue-800 text-yellow-100':'bg-transparent text-yellow-200'} rounded-full px-2 gap-2 py-1 border-2 shadow-lg mt-4 cursor-pointer hover: bg-slate-900`} onClick={()=>{
              setSelectTag(index.label)
              setClick(index.label);
            }}
              >{index.label}</div> 
            })
           }
            </div>
          
        <Recommendation className=' mt-6'>
          View all recommendations
          <img src="https://raw.githubusercontent.com/CleverProgrammers/cp-linkedin-clone/f014d361d787029f15ea0f0f78c053d8c214f138/public/images/right-icon.svg" alt="" />
        </Recommendation>
      </FollowCard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside;
`;

const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 12px;
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
`;



const Recommendation = styled.a`
  color: #0a66c2;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export default Rightside;