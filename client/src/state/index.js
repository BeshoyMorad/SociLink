import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("Error: User not logged in.");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setAddNewPost: (state, action) => {
      state.posts.push(action.payload);
    },
    setLikePost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          post.likes = action.payload.likes;
          return post;
        }
        return post;
      });
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setAddNewPost,
  setLikePost,
} = authSlice.actions;

export default authSlice.reducer;
