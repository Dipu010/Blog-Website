import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import Leftside from '../home/LeftSide'
import MyBlogRender from '../myblog/MyBlogRender'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// import { Layout } from '../../Layout/Layout'
export default function UserPost() {
    const {id}=useParams();
    const [result,setResult]=useState({});
    const getData=async()=>{
        const response=await axios.post("http://localhost:4000/api/v1/findbyusername",{userName:id},{withCredentials:true})
       setResult({...response.data.message.data});
    }
    useEffect(()=>{
        getData()
    },[id]);
    return (
        <div>
            <Container className=" bg-slate-500">
                <Layout>
                    <Leftside data={result}></Leftside>
                    <MyBlogRender></MyBlogRender>
                </Layout>
            </Container>
        </div>
    )
}
const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  /* grid-template-row: auto; */
  margin: 25px 0;
  margin-left:30px;
  margin-right:30px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }

`;
