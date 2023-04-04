import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";

function Login() {
  const alert = useAlert();
  const [show1, setshow1] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      if (show1 < 4) {
        setshow1(show1 + 1);
      } else {
        setshow1(1);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [show1]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, error, navigate, alert]);

  const HandlerLoginForm = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <LoginContainer>
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="frontImgWrapper">
            <img
              src={"https://res.cloudinary.com/doqgoey64/image/upload/v1680600327/login%20socioGram/loginpage1_cybqpg.png"}
              className={show1 === 1 ? "frontImg show" : "frontImg hide"}
              alt=""
            />
            <img
              src={"https://res.cloudinary.com/doqgoey64/image/upload/v1680600325/login%20socioGram/loginpage2_ritzle.png"}
              className={show1 === 2 ? "frontImg show" : "frontImg hide"}
              alt=""
            />
            <img
              src={"https://res.cloudinary.com/doqgoey64/image/upload/v1680600324/login%20socioGram/loginpage3_aixgrd.png"}
              className={show1 === 3 ? "frontImg show" : "frontImg hide"}
              alt=""
            />
            <img
              src={"https://res.cloudinary.com/doqgoey64/image/upload/v1680600328/login%20socioGram/loginpage4_l9j8yr.png"}
              className={show1 === 4 ? "frontImg show" : "frontImg hide"}
              alt=""
            />
          </div>
        </div>
        <div className="loginRight">
          <div className="loginRightWrapper">
            <div className="loginRightTop">
              <div className="loginRightTopTop">
                <span className="loginRightTopLogo">socioGram</span>
              </div>
              <div className="loginRightTopForm">
                <form className="loginBox" onSubmit={HandlerLoginForm}>
                  <input
                    className="loginInput"
                    type="text"
                    placeholder="Email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    minLength="6"
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="loginInput"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="loginButton">Login</button>
                </form>
              </div>
            </div>
            <div className="loginRightBottom">
              <center>
                <span></span>
              </center>
              <center>
                <span>Don't have an account?</span>
                <span
                  className="SignUptext"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign up
                </span>
              </center>
            </div>
          </div>
        </div>
      </div>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 100vw;
  display: flex;
  margin-top: 100px;
  justify-content: center;
  .hide {
    opacity: 0;
    -webkit-transition: opacity 1.5s ease-out;
    transition: opacity 1.5s ease-out;
    visibility: visible;
  }
  .show {
    opacity: 1;
    -webkit-transition: opacity 1.5s ease-in;
    transition: opacity 1.5s ease-in;
    z-index: 2;
  }
  .loginWrapper {
    width: 100%;
    height: 70%;
    display: flex;
  }
  .loginLeft {
    flex: 1;
    display: flex;
    position: relative;
    width: 100%;
    height: 600px;
    background-image: url("https://res.cloudinary.com/doqgoey64/image/upload/v1680600325/login%20socioGram/loginPage_fvm9ej.png");
    min-width: 460px;
    background-repeat: no-repeat;
    background-position: right 2px;
    @media (max-width: 877px) {
      flex: 1;
      display: none;
    }
  }
  .frontImgWrapper {
    display: flex;
  }
  .frontImg {
    position: absolute;
    top: 28px;
    right: 59px;
  }
  .loginRight {
    flex: 1;
    display: flex;
    height: max-content;
    @media (max-width: 877px) {
      justify-content: center;
    }
  }
  .loginRightWrapper {
    width: 360px;
    border: 1px solid rgb(224, 224, 224);
    border-radius: 3px;
    padding-bottom: 10px;
  }

  .loginRightTop {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .loginRightTopTop {
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 35px 0;
  }
  .loginRightTopLogo {
    font-family: "Dancing Script", cursive;
    font-size: 53px;
    font-weight: 500;
  }
  .loginRightTopForm {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .loginBox {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 70%;
    padding-bottom: 20px;
  }
  .loginInput {
    height: 30px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid gray;
    font-size: 14px;
    margin-bottom: 10px;
    padding: 0px 5px;
  }
  .loginButton {
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
    cursor: pointer;
  }
`;

export default Login;
