import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    // isAuthenticated:false,
}

export const userReducer = createReducer(initialState, {
    LoginRequest: (state) => {
        state.loading = true;
    },
    LoginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoginFailure: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
    },

    LogoutRequest: (state) => {
        state.loading = true;
    },
    LogoutSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated = false;
    },
    LogoutFailure: (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated = false;
    },

    // agr phle se login ho (mtlb cookie ho phle se)
    LoadRequest: (state) => {
        state.loading = true;
    },
    LoadSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoadFailure: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
    },


    RegisterRequest: (state) => {
        state.loading = true;
    },
    RegisterSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    RegisterFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    
    
})

export const postOfFollowingReducer = createReducer(initialState, {
    postOfFollowingRequest: (state) => {
        state.loading = true;
    },
    postOfFollowingSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload
    },
    postOfFollowingFailure: (state, action) => {
        state.loading = false;
        state.error = action.error;
    },
    clearErrors: (state) => {
        state.error = null;
    },
})

export const userProfileReducer = createReducer(initialState, {
    userProfileRequest: (state) => {
        state.loading = true;
    },
    userProfileSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    userProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});

export const allUsersReducer = createReducer(initialState, {
    allUsersRequest: (state) => {
        state.loading = true;
    },
    allUsersSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    allUsersFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});
export const suggestedUsersReducer = createReducer(initialState, {
    suggestedUsersRequest: (state) => {
        state.loading = true;
    },
    suggestedUsersSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    suggestedUsersFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});