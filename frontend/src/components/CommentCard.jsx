import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost, openPoste } from "../actions/postAction";
import { getFollowingPosts, getMyPosts } from "../actions/userAction";

const CommentCard = ({
  userId,
  username,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteCommentHandle = async () => {
    await dispatch(deleteCommentOnPost(postId, commentId));
    dispatch(openPoste(postId))
    if (isAccount) {
      console.log("my posts");
        dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  return (
    <div className="commentUser">
      <div className="leftSide">
        <Link to={`/user/${userId}`}>
          <img src={avatar} alt={username} />
          <Typography style={{ minWidth: "5vmax", "font-size": "1rem" }}>
            {username}
          </Typography>
        </Link>
        <Typography style={{ "align-self": "center", "font-size": "0.9rem" }}>
          {comment}
        </Typography>
      </div>
      <div className="rightSide">
        {isAccount ? (
          <Button onClick={deleteCommentHandle}>
            <Delete />
          </Button>
        ) : userId === user._id ? (
          <Button onClick={deleteCommentHandle}>
            <Delete />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default CommentCard;
