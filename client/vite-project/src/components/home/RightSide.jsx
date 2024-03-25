import React,{ useState,useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { BlogContext } from "../../context/BlogContext";

const Rightside = (props) => {
  const {dataArray,setDataArray}=useContext(BlogContext);
// Get All tags 
const [tags,setTags]=useState([]);
const [selectTag,setSelectTag]=useState('');
const getAllTags=async()=>{
const response=await axios.get("http://localhost:4000/api/v1/tags",{withCredentials:true})
console.log(response);
setTags([...response.data.message.tags]);
}
useEffect(()=>{
  getAllTags()
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
      <FollowCard>
        <Title>
          <h2> Some Popular Blog Genre/#tags</h2>
          <img src="https://raw.githubusercontent.com/CleverProgrammers/cp-linkedin-clone/f014d361d787029f15ea0f0f78c053d8c214f138/public/images/feed-icon.svg" alt="" />
        </Title>
         
            <div className=" grid grid-cols-3 mt-8">
           {
            tags. map((index,val)=>{
              console.log(index)
             return <div key={val} className="rounded-full px-2 gap-2 py-1 border-2 shadow-lg mt-4 cursor-pointer hover:bg-orange-500" onClick={()=>setSelectTag(index.label)}
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
  background-color: #fff;
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