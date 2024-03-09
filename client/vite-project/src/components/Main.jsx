import styled from "styled-components";
import { Link } from "react-router-dom";
const Main = (props) => {
  return 
 (<div>
     <Container>
    <Link to='/blog'>Create Blogs</Link>
 </Container>
 </div>
 )
};

const Container = styled.div`
  grid-area: main;

`;

export default Main;