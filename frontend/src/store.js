import {configureStore} from "@reduxjs/toolkit"
import { likeReducer, myPostsReducer, userPostsReducer } from "./reducers/postReducer";
import { allUsersReducer, postOfFollowingReducer, suggestedUsersReducer, userProfileReducer, userReducer } from "./reducers/userReducer";

const store = configureStore({
    reducer:{
        user:userReducer,
        allUsers: allUsersReducer,
        suggestedUsers: suggestedUsersReducer,
        postOfFollowing: postOfFollowingReducer,
        like: likeReducer,
        myPosts: myPostsReducer,
        userPosts: userPostsReducer,
        userProfile: userProfileReducer,
    }
})

export default store;