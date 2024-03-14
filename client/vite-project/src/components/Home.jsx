import styled from "styled-components";
import Leftside from "./LeftSide";
import Middle from "./Middle";
import Rightside from "./RightSide";
import Nav from "./nav";

const Home = (props) => {
 
  const data =JSON.parse(localStorage.getItem('ResPonse'))
  
  return (
    <div>
 <Nav data={data}></Nav>
    <Container>
      <Layout>
        <Leftside data={data} />
        <Middle data={data} />
        <Rightside />
      </Layout>
    </Container>
    </div>
  );
};

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

export default Home;