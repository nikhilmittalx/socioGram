import React from "react";
import "./pages/Profilee.css"

const ProfilePost = ({
    postImage,
    likes=[],
    comments=[]
}) => {

    const postClickHandler = () =>{
        console.log("post pe click")
    }
  return (
    <div className="gallery-item" onClick={postClickHandler}>
      <img
        src={postImage}
        className="gallery-image"
      />

      <div className="gallery-item-info">
        <ul>
          <li className="gallery-item-likes">
            <i className="fas fa-heart"></i> {likes.length}
          </li>
          <li className="gallery-item-comments">
            <i className="fas fa-comment"></i> {comments.length}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePost;
