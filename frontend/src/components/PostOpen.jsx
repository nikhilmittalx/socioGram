import React, { Fragment, useEffect } from "react";
import Topbar from "./Topbar";
import Postss from "./Postss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { openPoste } from "../actions/postAction";
import { useAlert } from "react-alert";
import Loader from "./Loader/Loader";

const PostOpen = () => {
    const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, post, error } = useSelector((state) => state.openPost);

  useEffect(() => {
    if (error) {
        alert.error(error)
    }
    dispatch(openPoste(params.id));
  }, [dispatch]);

  return (
    <Fragment>
      <Topbar />
      {/* {loading ? <Loader/> : ( */}
        <Fragment>
            {post && (
                <Postss
                key={post._id}
                postId={post._id}
                caption={post.caption}
                postImage={post.image.url}
                likes={post.likes}
                comments={post.comments}
                ownerImage={post.owner.avatar.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
                />
            )}
        </Fragment>
      {/* )} */}
    </Fragment>
  );
};

export default PostOpen;
