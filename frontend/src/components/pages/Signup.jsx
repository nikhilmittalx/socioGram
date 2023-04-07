import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css"
import { clearErrors, signUp } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("https://res.cloudinary.com/doqgoey64/image/upload/v1680688089/avatars/defaultavatar_kqhdwp.png");

  const { isAuthenticated, error } = useSelector((state)=>state.user)

  const avatarHandler = (e) =>{
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
        setAvatarPreview(Reader.result);
      }
    };
  }

  const registerHandler = async (e) => {
    e.preventDefault();
    if(password!==confirmPassword){
      return alert.error("Password doesn't match")
    }
    const userData = { name,username, email, password, avatar };
    dispatch(signUp(userData));
  };

  useEffect(()=>{
    if(error) {
      // cannot read properties of null aa rha jab signup ke bad refresh kr rhe
      alert.error(error);
      dispatch(clearErrors());
    }
    if(isAuthenticated){
      navigate("/")
    }
  }, [navigate, isAuthenticated, dispatch, error, alert])


  return (
    <SignupContainer>
      <div className="signupWrapper">
        <div className="signupRight">
          <div className="signupRightTop">
            <div className="signupRightTopTop">
              <span className="signupRightTopLogo">socioGram</span>
            </div>
            <div className="signupRightTopForm">
              <form action="" className="signupBox" onSubmit={registerHandler}>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                  type="text"
                  required
                  className="signupInput"
                  value={name}
                />
                <input
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Username"
                  type="text"
                  required
                  className="signupInput"
                  value={username}
                />
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                  type="email"
                  required
                  className="signupInput"
                  value={email}
                />
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                  type="password"
                  required
                  minLength="6"
                  className="signupInput"
                  value={password}
                />
                <input
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="Confirm Password"
                  type="password"
                  required
                  minLength="6"
                  className="signupInput"
                  value={confirmPassword}
                />
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={avatarHandler}
                  />
                </div>
                
                <button className="signupButton">Sign Up</button>
              </form>
            </div>
          </div>
          <div className="signupRightBottom">
            <center>
              <span>have an account? </span>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <span
                  className="SignUptext"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log in
                </span>
              </Link>
            </center>
          </div>
        </div>
      </div>
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  width: 100vw;
  display: flex;
  margin-top: 100px;
  justify-content: center;
  .signupRight {
    flex: 1;
    display: flex;
    height: max-content;
    justify-content: center;
    flex-direction: column;
    max-width: 360px;
    border: 1px solid #d6d6d6;
    padding: 10px;
    @media (max-width: 877px) {
      justify-content: center;
    }
  }
  .signupWrapper {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
  }
  .signupRightWrapper {
    width: 360px;
    border: 1px solid rgb(224, 224, 224);
    border-radius: 3px;
    padding-bottom: 10px;
  }

  .signupRightTop {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .signupRightTopTop {
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 35px 0;
  }
  .signupRightTopLogo {
    font-family: "Dancing Script", cursive;
    font-size: 53px;
    font-weight: 500;
  }
  .signupRightTopForm {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .signupBox {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 70%;
    padding-bottom: 20px;
  }
  .signupInput {
    height: 30px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid gray;
    font-size: 14px;
    margin-bottom: 10px;
    padding-left: 5px;
    padding-right: 5px;
  }
  .signupButton {
    margin-top: 10px;
    width: 100%;
    height: 25px;
    background-color: #0095f6;
    color: white;
    border-radius: 5px;
    border: none;
    font-size: 15px;
    cursor: pointer;
  }
  .SignUptext {
    color: #0095f6;
    font-weight: 500;
  }
`;
export default Signup;
