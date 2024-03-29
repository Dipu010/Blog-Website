import React from 'react'
import styled from 'styled-components';
import Leftside from "../components/home/LeftSide";
import Middle from "../components/home/Middle";
import Rightside from "../components/home/RightSide";

import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { DataDummy } from '../components/utils/DummyData';

export const HomeLayout = () => {
      const navigate=useNavigate()
      const {id}=useParams()
      var data =JSON.parse(localStorage.getItem('ResPonse'))

      if(data){
          navigate(`/${data.userName}/home`)
      }
      if(!id){
        data=DataDummy
        console.log("Data:-",data)
      }
      else if(id!==data.userName)
      return(<></>)

   
  return (
        <>
            <Container className=" bg-slate-500">
                <Layout>
                    <Leftside data={data} />
                    <Middle data={data}/>
                    <Rightside />
                </Layout>
            </Container>
        </>


      
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


