import styled from "styled-components";
import "../App.css";
import { Link } from "react-router";

function Landing() {
  return (
    <Main>
      <Title>popstats</Title>
      <Link to="/demo">Demo</Link>
    </Main>
  );
}

export default Landing;

const Main = styled.main`
  height: 100vh;
  width: 100vw;
  background-color: red;
`;

const Title = styled.h1`
  font-family: "Trap";
  font-size: 12rem;
`;
