import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Dialog, Typography, Button } from "@mui/material";
import "./UpdateProfile.css";
import "./Profilee.css";
import Topbar from "../Topbar";
import ProfilePost from "../ProfilePost";
import {
  deleteMyProfile,
  getMyPosts,
  loadUser,
  logout,
  updateProfile,
} from "../../actions/userAction";
import User from "../User";
import Loader from "../Loader/Loader";

const Profilee = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { posts, loading } = useSelector((state) => state.myPosts);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);

        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    dispatch(loadUser());
  };
  const deleteProfileHandler = async () => {
      await dispatch(deleteMyProfile());
      dispatch(logout());
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <div className="profile">
          <div className="profile-image">
            <img src={user.avatar.url} alt="" />
          </div>
          
          <div className="profile-user-settings">
            <h1 className="profile-user-name">{user.name}</h1>

            <div
              className="profile-edit-btn"
              onClick={() => setEditToggle(!editToggle)}
            >
              Edit Profile
            </div>


            <div
              className="profile-settings-btn"
              onClick={() => setShowConfirmDelete(!showConfirmDelete)}
            >
              <i className="fas fa-trash" ></i>
            </div>
          </div>

          <div className="profile-stats">
            <ul>
              <li style={{ cursor: "auto" }}>
                <span className="profile-stat-count">{user.posts.length}</span>{" "}
                posts
              </li>
              <li onClick={() => setFollowersToggle(!followersToggle)}>
                <span className="profile-stat-count">
                  {user.followers.length}
                </span>{" "}
                followers
              </li>
              <li onClick={() => setFollowingToggle(!followingToggle)}>
                <span className="profile-stat-count">
                  {user.following.length}
                </span>{" "}
                following
              </li>
            </ul>
          </div>

          {/* <div className="profile-bio">
              <p>
                <span className="profile-real-name"> 
                </span> Good at fake smiling :) <br></br> 📷✈️🏕️
              </p>
            </div> */}
        </div>
      </div>
      {/* </header> */}

      <div className="container">
        <div className="gallery">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <ProfilePost
                    key={post._id}
                    postImage={post.image.url}
                    likes={post.likes}
                    comments={post.comments}
                  />
                ))
              ) : (
                <Typography variant="h6">You have not made any post</Typography>
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
          <Typography variant="h6">Followers</Typography>

          {user && user.followers.length > 0 ? (
            user.followers.map((follower) => (
              <User
                key={follower._id}
                userId={follower._id}
                name={follower.name}
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
          <Typography variant="h6">Following</Typography>

          {user && user.following.length > 0 ? (
            user.following.map((follow) => (
              <User
                key={follow._id}
                userId={follow._id}
                name={follow.name}
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

      <Dialog open={editToggle} onClose={() => setEditToggle(!editToggle)}>
        <div className="DialogBox" style={{}}>
          <Typography variant="h6">Edit profile</Typography>

          <div className="updateProfile">
            <form className="updateProfileForm" onSubmit={submitHandler}>
              <Avatar
                src={avatarPrev}
                alt="User"
                sx={{ height: "8vmax", width: "8vmax" }}
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              <input
                type="text"
                value={name}
                placeholder="Name"
                className="updateProfileInputs"
                required
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                className="updateProfileInputs"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button disabled={updateLoading} type="submit">
                Update
              </Button>
              
            </form>
          </div>
        </div>
      </Dialog>



      <Dialog open={showConfirmDelete} onClose={() => setShowConfirmDelete(!showConfirmDelete)}>
        <div className="DialogBox" style={{"height":"150px",}}>
          <Typography variant="h6" style={{"font-size":"1.25rem"}}>You're about to delete your account. Go ahead?</Typography>
          {/* <Typography variant="h6">Are you sure you want to delete your account ?</Typography> */}
          <div className="btns" style={{"display":"flex", "margin-top":"10px"}}>
            <Button onClick={deleteProfileHandler} style={{"color":"red"}}>Yes</Button>
            <Button onClick={() => setShowConfirmDelete(false)} >Cancel</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Profilee;
