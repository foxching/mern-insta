import axios from "axios";
import {
  ADD_POST,
  LOADING_POSTS,
  LOAD_ALL_POSTS,
  LOAD_MY_POSTS,
  TOGGLE_LIKE_UNLIKE_POST,
  ADD_COMMENT,
  DELETE_POST,
  DELETE_COMMENT
} from "../constants/types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { url } from "../../api/url";
//import M from "materialize-css";

export const getAllPost = () => (dispatch, getState) => {
  dispatch({ type: LOADING_POSTS });
  axios
    .get(`${url}/api/post/allPost`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: LOAD_ALL_POSTS, payload: res.data });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getMyPost = () => (dispatch, getState) => {
  dispatch({ type: LOADING_POSTS });
  axios
    .get(`${url}/api/post/myPost`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: LOAD_MY_POSTS, payload: res.data });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const createPost = (post, history) => (dispatch, getState) => {
  axios
    .post(`${url}/api/post/createPost`, post, tokenConfig(getState))
    .then(res => {
      dispatch({ type: ADD_POST, payload: res.data.newPost });
      //M.toast({ html: res.data.msg, classes: "#43a047 green darken-1" });
      history.push("/");
    })
    .catch(err => {
      //M.toast({ html: err.response.data.msg, classes: "#c62828 red darken-3" });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const togglelikeUnLikePost = postId => (dispatch, getState) => {
  const userId = getState().auth.user._id;
  axios
    .put(`${url}/api/post/toggleLikeUnlike`, { postId }, tokenConfig(getState))
    .then(res => {
      dispatch({ type: TOGGLE_LIKE_UNLIKE_POST, payload: { postId, userId } });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err);
    });
};

export const createComment = (text, postId) => (dispatch, getState) => {
  axios
    .put(`${url}/api/post/comment`, { text, postId }, tokenConfig(getState))
    .then(res => {
      const comment = res.data.post.comments[res.data.post.comments.length - 1];
      dispatch({ type: ADD_COMMENT, payload: { comment, postId } });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err);
    });
};

export const deletePost = postId => (dispatch, getState) => {
  axios
    .delete(`${url}/api/post/deletePost/${postId}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: DELETE_POST, payload: postId });
      //M.toast({ html: res.data.msg, classes: "#43a047 green darken-1" });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err);
    });
};

export const deleteComment = (postId, commentId) => (dispatch, getState) => {
  axios
    .delete(
      `${url}/api/post/deleteComment/${postId}/${commentId}`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
    });
};
