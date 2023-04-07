import { createReducer } from "@reduxjs/toolkit";

const initialState = {}

export const likeReducer = createReducer(initialState, {
    likeRequest: (state) => {
        state.loading = true;
    },
    likeSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    likeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null
    },
    clearMessage: (state) => {
        state.message = null
    },


    addCommentRequest: (state) => {
        state.loading = true;
    },
    addCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addCommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    deleteCommentRequest: (state) => {
        state.loading = true;
    },
    deleteCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteCommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    newPostRequest: (state) => {
        state.loading = true;
    },
    newPostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    newPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    followUserRequest: (state) => {
        state.loading = true;
    },
    followUserSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    followUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    updateProfileRequest: (state) => {
        state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    deleteProfileRequest: (state) => {
        state.loading = true;
    },
    deleteProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

})

export const userPostsReducer = createReducer(initialState, {
    userPostsRequest: (state) => {
        state.loading = true;
    },
    userPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    userPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    }
})

export const myPostsReducer = createReducer(initialState, {
    myPostsRequest: (state) => {
        state.loading = true;
    },
    myPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    myPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    }
})

export const openPostReducer = createReducer(initialState, {
    openPostRequest:(state)=>{
        state.loading = true;
    },
    openPostSuccess:(state, action)=>{
        state.loading = false;
        state.post = action.payload;
    },
    openPostFailure:(state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    }
})