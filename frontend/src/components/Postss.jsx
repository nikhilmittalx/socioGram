import React, { Fragment, useEffect, useState } from "react";
import "./postss.css";
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost, likePost } from "../actions/postAction";
import { Typography, Dialog } from "@mui/material";
import { getFollowingPosts } from "../actions/userAction";
import User from "./User";
import CommentCard from "./CommentCard";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";

const Postss = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  createdAt,
  isDelete = false,
  isAccount = false,
}) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);

  const openProfile = async () => {
    // console.log("profile open pe click");
    navigate(`/user/${ownerId}`);
  };

  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));

    // isse real time me likes update honge
    if (isAccount) {
      console.log("apni posts");
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const addCommentHandler = async (e) => {
    console.log("adding comment");
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));
    if (isAccount) {
      console.log("apni posts");
    } else {
      dispatch(getFollowingPosts());
    }
    setCommentValue("");
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) setLiked(true);
    });
  }, [likes, user._id]);

  return (
    <>
      <div className="col-9">
        <div className="card">
          <div className="top">
            <div className="userDetails">
              <div className="profilepic">
                <div className="profile_img">
                  <div className="image" onClick={openProfile}>
                    <img src={ownerImage} alt="img8" />
                  </div>
                </div>
              </div>
              <h3 onClick={openProfile} style={{ cursor: "pointer" }}>
                {ownerName}
                {/* <span>  <ReactTimeAgo date={createdAt} locale="en-US"/> </span> */}
                <br />
                {/* <span>"yaha location dalni h"</span> */}
              </h3>
            </div>
            <div>
              <span className="dot">
                <i className="fas fa-ellipsis-h"></i>
              </span>
            </div>
          </div>
          <div className="imgBx">
            <img src={postImage} alt="post-1" className="cover" />
          </div>
          <div className="bottom">
            <div className="actionBtns">
              <div className="left">
                {/* <Button onClick={handleLike}>
                  {liked ? (
                    <Favorite style={{ color: "red" }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </Button> */}

                <span className="heart" onClick={handleLike}>
                  <span>
                    {liked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Like"
                        role="img"
                        fill="red"
                        height="24"
                        width="24"
                        viewBox="0 0 512 512"
                      >
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Like"
                        role="img"
                        fill="#262626"
                        height="24"
                        width="24"
                        viewBox="0 0 512 512"
                      >
                        <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                      </svg>
                    )}
                  </span>
                </span>

                <svg
                  aria-label="Comment"
                  className="_8-yf5"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 48 48"
                  width="24"
                  onClick={() => setCommentToggle(!commentToggle)}
                >
                  <path
                    clipRule="evenodd"
                    d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5
										11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0
										7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0
										4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1
										8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10
										2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5
										44.5 12.7 44.5 24z"
                    fillRule="evenodd"
                  ></path>
                </svg>

                {/* <svg
                  aria-label="Share Post"
                  className="_8-yf5"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 48 48"
                  width="24"
                >
                  <path
                    d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3
										3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6
										1 1.2 1.1h.2c.5 0 1-.3
										1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2
										6.1h35.5L18 18.7 5.2 6.1zm18.7
										33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"
                  ></path>
                </svg> */}
              </div>

              <div className="right">
                <svg
                  aria-label="Save"
                  className="_8-yf5"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 48 48"
                  width="24"
                >
                  <path
                    d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6
										47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7
										3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4
										1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8
										0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6
										1.4-.9 2.2-.9z"
                  ></path>
                </svg>
              </div>
            </div>
            {/* <a href="#"> */}
            <p onClick={() => setLikesUser(!likesUser)} className="likes">
              {likes.length} likes
            </p>
            {/* </a> */}
            <a href="#">
              <p className="message">
                <b>{ownerName}</b> <text className="caption">{caption}</text>
              </p>
            </a>

            {/* {comments.length > 0 ? (
              comments.map((item) => (
                <CommentCard
                  userId={item.user._id}
                  name={item.user.name}
                  avatar={item.user.avatar.url}
                  comment={item.comment}
                  commentId={item._id}
                  key={item._id}
                  postId={postId}
                  isAccount={isAccount}
                />
              ))
            ) : (
              null
            )} */}

            {comments.length ? (
              // <a href="#">
              <h4
                className="comments"
                onClick={() => setCommentToggle(!commentToggle)}
              >
                View all {comments.length} comments
              </h4>
            ) : (
              // </a>
              ""
            )}

            {/* <a href="#"> */}
            {/* <h5 className="postTime">"2 hours ago" -- sbme same h abhi</h5> */}
            {/* </a> */}

            <div className="addComments">
              <div className="reaction">
                <h3>
                  <i className="far fa-smile"></i>
                </h3>
              </div>
              {/* <form style={{"display":"flex" }}> */}
              <input
                type="text"
                className="text"
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder="Add a comment..."
                required
              />
              <p style={{ color: "#0095F6" }} onClick={addCommentHandler}>
                Post
              </p>

              {/* </form> */}
              {/* <input
                type="text"
                className="text"
                placeholder="Add a comment..."
              /> */}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography variant="h5">Liked By</Typography>

          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox" style={{ "overflow-x": "hidden" }}>
          <Typography variant="h5">Comments</Typography>
          <form className="commentForm" onSubmit={addCommentHandler}>
            <div
              className="addComments "
              style={{
                "border-top": "0px",
                "margin-top": "0px",
                "border-bottom": "1px solid #ddd",
                "margin-bottom": "20px",
              }}
            >
              <div className="reaction">
                <h3>
                  <i className="far fa-smile"></i>
                </h3>
              </div>
              {/* <form style={{"display":"flex" }}> */}
              <input
                type="text"
                className="text"
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder="Add a comment..."
                required
              />
              <p style={{ color: "#0095F6" }} onClick={addCommentHandler}>
                Post
              </p>

              {/* </form> */}
              {/* <input
                type="text"
                className="text"
                placeholder="Add a comment..."
              /> */}
            </div>

            {/* <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Add a comment..."
              required
            />

            <Button type="submit" variant="contained">
              Add
            </Button> */}

            {comments.length > 0 ? (
              comments.map((item) => (
                <CommentCard
                  userId={item.user._id}
                  name={item.user.name}
                  avatar={item.user.avatar.url}
                  comment={item.comment}
                  commentId={item._id}
                  key={item._id}
                  postId={postId}
                  isAccount={isAccount}
                />
              ))
            ) : (
              <Typography>No comments Yet</Typography>
            )}
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default Postss;
