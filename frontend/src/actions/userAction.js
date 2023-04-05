import axios from "axios"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest"
        })

        // is data me 3 chije milengi success, user, token(backend se ye sab bheja tha)
        const { data } = await axios.post("/api/v1/login", { email, password }, { headers: { 'Content-Type': 'application/json' } })

        dispatch({
            type: "LoginSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error.response.data.message,
        })
    }
}
export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: "LogoutRequest"
        })

        const { data } = await axios.get("/api/v1/logout")

        dispatch({
            type: "LogoutSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "LogoutFailure",
            payload: error.response.data.message,
        })
    }
}
export const signUp = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: "RegisterRequest"
        })

        // is data me 3 chije milengi success, user, token(backend se ye sab bheja tha)
        const { data } = await axios.post("/api/v1/register", userData, { headers: { 'Content-Type': 'multipart/form-data' } })

        dispatch({
            type: "RegisterSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "RegisterFailure",
            payload: error.response.data.message,
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadRequest"
        })

        // is data me 3 chije milengi success, user, token(backend se ye sab bheja tha)
        const { data } = await axios.get("/api/v1/me")

        dispatch({
            type: "LoadSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "LoadFailure",
            payload: error.response.data.message,
        })
    }
}

export const getFollowingPosts = () => async (dispatch) => {
    try {
        dispatch({ type: "postOfFollowingRequest" })

        const { data } = await axios.get("/api/v1/posts")

        dispatch({
            type: "postOfFollowingSuccess",
            payload: data.posts
        })
    } catch (error) {
        dispatch({
            type: "postOfFollowingFailure",
            error: error.response.data.message
        })
    }
}

export const getMyPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: "myPostsRequest",
        });

        const { data } = await axios.get("/api/v1/my/posts");
        dispatch({
            type: "myPostsSuccess",
            payload: data.posts,
        });
    } catch (error) {
        dispatch({
            type: "myPostsFailure",
            payload: error.response.data.message,
        });
    }
};


export const getUserPosts = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "userPostsRequest",
        });

        const { data } = await axios.get(`/api/v1/userposts/${id}`);
        dispatch({
            type: "userPostsSuccess",
            payload: data.posts,
        });
    } catch (error) {
        dispatch({
            type: "userPostsFailure",
            payload: error.response.data.message,
        });
    }
};

export const getUserProfile = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "userProfileRequest",
        });

        const { data } = await axios.get(`/api/v1/user/${id}`);
        dispatch({
            type: "userProfileSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "userProfileFailure",
            payload: error.response.data.message,
        });
    }
};


export const followAndUnfollowUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "followUserRequest",
        });

        const { data } = await axios.get(`/api/v1/follow/${id}`);
        dispatch({
            type: "followUserSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "followUserFailure",
            payload: error.response.data.message,
        });
    }
};


export const getAllUsers =
    (username = "") =>
        async (dispatch) => {
            try {
                dispatch({
                    type: "allUsersRequest",
                });

                const { data } = await axios.get(`/api/v1/users?username=${username}`);
                //   const { data } = await axios.get(`/api/v1/users`);
                dispatch({
                    type: "allUsersSuccess",
                    payload: data.users,
                });
            } catch (error) {
                dispatch({
                    type: "allUsersFailure",
                    payload: error.response.data.message,
                });
            }
        };
export const getSuggestedUsers = (name="") =>
        async (dispatch) => {
            try {
                dispatch({
                    type: "suggestedUsersRequest",
                });

                const { data } = await axios.get(`/api/v1/users/suggested`);
                //   const { data } = await axios.get(`/api/v1/users`);
                dispatch({
                    type: "suggestedUsersSuccess",
                    payload: data.users,
                });
            } catch (error) {
                dispatch({
                    type: "suggestedUsersFailure",
                    payload: error.response.data.message,
                });
            }
        };


export const updateProfile = (name, email, avatar, bio) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProfileRequest",
        });

        const { data } = await axios.put(
            "/api/v1/update/profile",
            { name, email, avatar,bio },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({
            type: "updateProfileSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "updateProfileFailure",
            payload: error.response.data.message,
        });
    }
};

export const deleteMyProfile = () => async (dispatch) => {
    try {
      dispatch({
        type: "deleteProfileRequest",
      });
  
      const { data } = await axios.delete("/api/v1/delete/me");
  
      dispatch({
        type: "deleteProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteProfileFailure",
        payload: error.response.data.message,
      });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: "clearErrors" });
  };
  