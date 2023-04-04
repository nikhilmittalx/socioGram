import React from "react";
import styled from "styled-components";
import Feed from "../Feed";
import Topbar from "../Topbar";

import Rightbarr from "../Rightbarr";

function Home() {
  return (
    <>
      {/* {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Topbar />
          <HomeContainer>
            <Feed />
            <Rightbarr />
          </HomeContainer>
        </Fragment>
      )} */}

      <Topbar />
      <HomeContainer>
        <Feed />
        <Rightbarr />
      </HomeContainer>
      
    </>
  );
}

export default Home;

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
