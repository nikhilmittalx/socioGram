import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Dialog, Typography } from "@mui/material";

import "./Profilee.css";
import Topbar from "../Topbar";
import ProfilePost from "../ProfilePost";
import {
  deleteMyProfile,
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
  loadUser,
  logout,
  updateProfile,
} from "../../actions/userAction";
import User from "../User";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";




const Profile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  
  const [followingToggle, setFollowingToggle] = useState(false);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const { user } = useSelector((state) => state.userProfile);
  const { user: me } = useSelector((state) => state.user);
  const { posts, loading } = useSelector((state) => state.userPosts);



  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    // console.log(params.id);
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
      navigate("/account")
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, me._id, params.id]);



  return (
    <>
      <Topbar />
      {user && (
        <div class="container">
          <div class="profile">
            <div class="profile-image">
              <img src={user.avatar.url} alt="" />
            </div>

            <div class="profile-user-settings">
              <h1 class="profile-user-name">{user.username}</h1>

              {myProfile ? (
                <div
                  className="profile-edit-btn"
                >
                  Edit Profile
                </div>
              ) : (
                <div class="profile-edit-btn" style={{ border: "none" }}>
                  <Button
                    variant="contained"
                    className="followBtn"
                    onClick={followHandler}
                  >
                    {" "}
                    {following ? "Unfollow" : "Follow"}
                  </Button>
                </div>
              )}

              {myProfile ? (
                <div
                  className="profile-settings-btn"
                >
                  <i className="fas fa-trash"></i>
                </div>
              ) : null}
            </div>

            <div className="profile-stats">
              <div className="profile-bio">
                <h3 style={{ "font-weight": "500" }}>{user.name}</h3>
                <p>
                  <span className="profile-real-name"></span>
                  {user.bio}
                </p>
              </div>
            </div>

            <div class="profile-stats">
              <ul>
                <li style={{ cursor: "auto" }}>
                  <span class="profile-stat-count">{user.posts.length}</span>{" "}
                  posts
                </li>
                <li onClick={() => setFollowersToggle(!followersToggle)}>
                  <span class="profile-stat-count">
                    {user.followers.length}
                  </span>{" "}
                  followers
                </li>
                <li onClick={() => setFollowingToggle(!followingToggle)}>
                  <span class="profile-stat-count">
                    {user.following.length}
                  </span>{" "}
                  following
                </li>
              </ul>
            </div>

            {/* {myProfile ? null : (
              <Button
                variant="contained"
                className="followBtn"
                onClick={followHandler}
              >
                {" "}
                {following ? "Unfollow" : "Follow"}
              </Button>
            )} */}
          </div>
        </div>
      )}

      <div class="container">
        <div class="gallery">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <ProfilePost
                    key={post._id}
                    postId={post._id}
                    caption={post.caption}
                    postImage={post.image.url}
                    likes={post.likes}
                    comments={post.comments}
                    ownerImage={post.owner.avatar.url}
                    ownerUsername={post.owner.username}
                    ownerId={post.owner._id}
                    isAccount={myProfile}
                  />
                ))
              ) : (
                <Typography variant="h6">User has not made any post</Typography>
              )}
            </Fragment>
          )}
        </div>
      </div>

      <Dialog
        open={followersToggle}
        onClose={() => setFollowersToggle(!followersToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h5">Followers</Typography>

          {user && user.followers.length > 0 ? (
            user.followers.map((follower) => (
              <User
                key={follower._id}
                userId={follower._id}
                username={follower.username}
                avatar={follower.avatar.url}
              />
            ))
          ) : (
            <Typography style={{ margin: "2vmax" }}>
              You have no followers
            </Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        open={followingToggle}
        onClose={() => setFollowingToggle(!followingToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h5">Following</Typography>

          {user && user.following.length > 0 ? (
            user.following.map((follow) => (
              <User
                key={follow._id}
                userId={follow._id}
                username={follow.username}
                avatar={follow.avatar.url}
              />
            ))
          ) : (
            <Typography style={{ margin: "2vmax" }}>
              You're not following anyone
            </Typography>
          )}
        </div>
      </Dialog>


    </>
  );
};

export default Profile;
