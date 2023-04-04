import {React, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import "./NewPost.css"
import SearchBarMobile from "./SearchBarMobile";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getMyPosts, loadUser, logout } from "../actions/userAction";
import { Button, Dialog, Typography } from "@mui/material";
import { createNewPost } from "../actions/postAction";
import { useAlert } from "react-alert";

function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const { loading, error, message } = useSelector((state) => state.like);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image));
    dispatch(loadUser());
    dispatch(getMyPosts());
  };
  
  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      console.log(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);


  const { user } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setshowSearch] = useState(false);

  const [showAddPost, setShowAddPost] = useState(false);
  // const [usersSearch, setusersSearch] = useState([]);
  const [searchquery, setSearchquery] = useState("");
  const [showBarSearchMobile, setShowBarSearchMobile] = useState(false);

  // const [name, setName] = useState("");
  const { users } = useSelector((state) => state.allUsers);

  const logoutHandler = async () => {

    dispatch(logout());
    alert.success("logged out")
    navigate("/login");
  };

  const showBarSearchMobileHandler = () => {
    setShowBarSearchMobile(true);
  };
  const hideBarSearchMobileHandler = () => {
    setShowBarSearchMobile(false);
    setshowSearch(false);
  };

  const searchHandler = (e) => {
    if (searchquery.length < 1) {
      setshowSearch(false);
    } else {
      setshowSearch(true);
    }
    setSearchquery(e.target.value);
  };
  useEffect(()=>{
    if(setshowSearch)
    dispatch(getAllUsers(searchquery));
    
  }, [dispatch, searchquery])

  document.body.addEventListener("click", myFunction);

  function myFunction() {
    setshowSearch(false)
    // if(showBarSearchMobile){
    //   setShowBarSearchMobile(false)
    // }
  }



  return (
    <>
      {showBarSearchMobile && (
        <SearchBarMobile
          searchHandler={searchHandler}
          hidebar={hideBarSearchMobileHandler}
        />
      )}

      <TopbarContainer>
        <div className="TopbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            {/* <span className="Logo">instagram</span> */}
            <span className="Logo">
              socioGram
              {/* <img
                style={{ "marginLeft": "20px" }}
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              /> */}
            </span>
          </Link>
        </div>

        <div className="TopbarCenter">
          <div className="Searchbar">
            <AiOutlineSearchStyled />
            {/* <form action="" onSubmit={searchSubmitHandler}> */}
            <input
              // onChange={(e) => setName(e.target.value)}
              onChange={searchHandler}
              type="text"
              // value={name}
              className="SearchInput"
              placeholder="Search"
            />
            {/* <AiOutlineClose className="SearchIcon" style={{"height":"20px", "width":"20px", "cursor":"pointer"}} onClick={myFunction}/> */}
          </div>
          {showSearch && (
            <>
              <Search
                data={users}
                // onClose={setshowSearch(false)}
                hideSearch={() => {
                  setshowSearch(false);
                }}
              />
            </>
          )}
        </div>

        <div className="TopbarRight">
          <div className="TopbarIcons">
            <div className="TopbarIconItem">
              <FiSearchStyled
                onClick={showBarSearchMobileHandler}
              ></FiSearchStyled>
            </div>

            <div className="TopbarIconItem">
              <BsPlusSquareStyled
                onClick={() => {
                  setShowAddPost(true);
                }}
              />
            </div>

            <div className="TopbarIconItem">
              <AiHomeStyled
                onClick={() => {
                  navigate(`/`)
                }}
              />
            </div>

            <img
              className="TopbarImg"
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              alt=""
              // src="a.jpg"
              src={user.avatar.url}
            />
            {showMenu && (
              <div className="TopbarMenu">
                <span
                  className="menuItems"
                  onClick={() => {
                    navigate(`/account`);
                    // navigate(`/profile/${user.data.username}`);
                  }}
                >
                  Profile
                </span>

                <span className="menuItems" onClick={logoutHandler}>
                  Logout
                </span>
              </div>
            )}
          </div>
        </div>
      </TopbarContainer>

      <Dialog open={showAddPost} onClose={() => setShowAddPost(!showAddPost)}>
        {/* <div className="DialogBox"> */}
          {/* <Typography variant="h5">Create New Post</Typography> */}
          <form className="newPostForm" onSubmit={submitHandler}>
            <Typography variant="h6">New Post</Typography>

            {image && <img src={image} alt="post" />}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <input
              type="text"
              placeholder="Caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <Button disabled={loading} type="submit">
              Post
            </Button>
          </form>
        {/* </div> */}
      </Dialog>
    </>
  );
}

const FiSearchStyled = styled(FiSearch)`
  font-size: 20px;
  margin-right: 10px;
  display: none;
  @media (max-width: 655px) {
    display: block;
  }
`;
const BsPlusSquareStyled = styled(BsPlusSquare)`
  font-size: 20px;
  margin-right: 10px;
`;
const AiHomeStyled = styled(AiOutlineHome)`
  font-size: 24px;
  font-weight: 200;
  margin-right: 10px;
`;
const AiOutlineSearchStyled = styled(AiOutlineSearch)`
  font-size: 20px !important;
  margin-left: 10px;
`;
const TopbarContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: rgb(255, 255, 255);
  justify-content: center;
  // border-bottom: 1px solid gray;
  box-shadow: -2px 10px 9px -7px rgba(0, 0, 0, 0.14);
  -webkit-box-shadow: -2px 10px 9px -7px rgba(0, 0, 0, 0.14);
  -moz-box-shadow: -2px 10px 9px -7px rgba(0, 0, 0, 0.4);
  @media (max-width: 655px) {
    justify-content: space-between;
  }
  .TopbarLeft {
    padding-right: 130px;
    display: flex;
    @media (max-width: 655px) {
      padding-right: 0px;
    }
  }
  .Logo {
    font-size: 26px;
    padding-right: 20px;
    padding-left: 20px;
    font-weight: 500;
    color: black;
    cursor: pointer;
    font-family: "Dancing Script", cursive;
  }
  .Searchbar {
    width: 100%;
    height: 30px;
    background-color: rgb(218, 218, 218);
    border-radius: 10px;
    display: flex;
    align-items: center;
    @media (max-width: 655px) {
      display: none;
    }
  }
  .TopbarCenter {
    display: flex;
    width: 400px;
    justify-content: center;
    margin: 0 20px;
    z-index: 2;
  }
  .SearchInput {
    border: none;
    width: 70%;
    background-color: rgb(218, 218, 218);

    &:focus {
      outline: none;
    }
  }
  .TopbarRight {
    margin-right: 10px;
    padding-left: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 655px) {
      padding-left: 0px;
    }
  }
  .TopbarIcons {
    display: flex;
    position: relative;
  }
  .TopbarMenu {
    position: absolute;
    top: 42px;
    width: 120px;
    right: -4px;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  }
  .menuItems {
    margin: 7px;
    border-bottom: 1px solid #e1e1e1;
    color: black;
    cursor: pointer;
  }
  .TopbarIconItem {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .TopbarImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }
`;

export default Topbar;
