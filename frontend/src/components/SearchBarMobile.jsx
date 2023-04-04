import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

function SearchBarMobile(props) {
  // document.body.addEventListener("click",props.hidebar);
  return (
    <>
      {/* <Backdrop onClose={props.hidebar} /> */}
      <SearchBarMobileContainer>
        <div className="searchbar">
          <AiOutlineSearch className="SearchIcon" style={{"height":"20px", "width":"20px", "margin-left":"10px"}}/>
          <input
            onChange={props.searchHandler}
            type="text"
            className="searchInput"
            placeholder="Search"
          />
          
          <AiOutlineClose className="SearchIcon" style={{"height":"30px", "width":"30px", "padding":"5px 5px" , "margin-right":"5px", "cursor":"pointer"}} onClick={props.hidebar}/>
        </div>
      </SearchBarMobileContainer>
    </>
  );
}

const SearchBarMobileContainer = styled.div`
  display: flex;
  background-color: aliceblue;
  height: 50px;
  width: 100%;
  top: 0;
  z-index: 30;
  position: fixed;
  .searchbar {
    width: 100%;
    height: 100%;
    background-color: rgb(218, 218, 218);
    border-radius: 10px;
    display: flex;
    align-items: center;
  }
  .searchInput {
    border: none;
    width: 100%;
    background-color: rgb(218, 218, 218);

    &:focus {
      outline: none;
    }
  }
`;

export default SearchBarMobile;
