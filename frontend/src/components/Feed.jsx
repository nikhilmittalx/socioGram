import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPosts } from "../actions/userAction";
import { Typography } from "@mui/material";
import Postss from "./Postss";
import Loader from "./Loader/Loader";

function Feed() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.postOfFollowing);
  // const [loadingNewPosts, setLoadingNewPosts] = useState(true);

  useEffect(() => {
    dispatch(getFollowingPosts());
  }, [dispatch]);

  const { error, message } = useSelector((state) => state.like);
  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      console.log(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <FeedContainer>
            {/* <Postss/> */}
            {/* <Stories /> */}
            <div className="FeedWrapper">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
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
                    createdAt={post.createdAt}
                  />
                ))
              ) : (
                <Typography variant="h6">No posts yet</Typography>
              )}

             
            </div>
          </FeedContainer>
        </Fragment>
      )}
    </>
  );
}

const FeedContainer = styled.div`
  width: 500px;
  margin-top: 20px;
  .FeedWrapper {
    height: calc(100vh - 63px);
    overflow-y: auto;
    padding: 5px;
    ::-webkit-scrollbar {
      width: 0px;
    }
    ::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgb(192, 192, 192);
    }
  }
`;

export default Feed;
