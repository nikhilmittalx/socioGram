import React, { useEffect } from "react";
import "./postss.css";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestedUsers } from "../actions/userAction";
import { useNavigate } from "react-router-dom";

const Rightbarr = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.suggestedUsers);
  const {loading} = useSelector((state)=>state.postOfFollowing)
  useEffect(() => {
    dispatch(getSuggestedUsers());
  }, [dispatch]);

  return (
    <>
    {loading ? (null) : (
      <div className="col-3">
        <div className="card">
          <h4>Suggestions For You</h4>

          {users && users.length > 0
            ? users.map((user) => (
                <div className="top">
                  <div className="userDetails">
                    <div
                      className="profilepic"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/user/${user._id}`)}
                    >
                      <div className="profile_img">
                        <div className="image">
                          <img src={user.avatar.url} alt="img12" />
                        </div>
                      </div>
                    </div>
                    <h3
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/user/${user._id}`)}
                    >
                      {user.username}
                      <br />
                      <span style={{ "font-size": "12px" }}>
                        {/* Followed By{" "} */}
                        {user.followers.length > 0 ? (
                          <span style={{ "font-size": "12px" }}>
                            {" "}
                            Followed By {user.followers[0].name}
                            {user.followers.length - 1 > 0 ? (
                              <span style={{ "font-size": "12px" }}>
                                {" "}
                                and {user.followers.length - 1} others
                              </span>
                            ) : null}
                          </span>
                        ) : null}
                      </span>
                      {/* <span>Followed By "bla bla bla"</span> */}
                    </h3>
                  </div>
                </div>
              ))
            : null}

          {/* <div className="top">
            <div className="userDetails">
              <div className="profilepic">
                <div className="profile_img">
                  <div className="image">
                    <img
                      src="https://media.geeksforgeeks.org/wp-content/uploads/20220609093221/g2-200x200.jpg"
                      alt="img12"
                    />
                  </div>
                </div>
              </div>
              <h3>
                yaha name
                <br />
                <span>Followed By "bla bla bla"</span>
              </h3>
            </div>
            <div>
              <a href="#" className="follow">
                follow{" "}
              </a>
            </div>
          </div> */}
        </div>

        {/* <div className="footer">
          <a className="footer-section" href="#">
            About
          </a>
          <a className="footer-section" href="#">
            Help
          </a>
          <a className="footer-section" href="#">
            API
          </a>
          <a className="footer-section" href="#">
            Jobs
          </a>
          <a className="footer-section" href="#">
            Privacy
          </a>
          <a className="footer-section" href="#">
            Terms
          </a>
          <a className="footer-section" href="#">
            Locations
          </a>
          <br />
          <a className="footer-section" href="#">
            Hashtag
          </a>
          <a className="footer-section" href="#">
            Language
          </a>
          <br />
          <br />
          <span className="footer-section">© 2023 INSTAGRAM FROM FACEBOOK</span>
        </div> */}
      </div>
    )}
      
    </>
  );
};

export default Rightbarr;
