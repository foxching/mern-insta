import axios from "axios";
import {PROFILE_LOADING, PROFILE_LOADED, FOLLOW_USER, UNFOLLOW_USER} from "../constants/types";
import { tokenConfig } from "./authActions";


export const getUserProfile = (username) => (dispatch, getState) => {
    dispatch({ type: PROFILE_LOADING });
    axios
      .get(`/api/user/${username}`, tokenConfig(getState))
      .then(res => {
        dispatch({ type: PROFILE_LOADED, payload: res.data });
      })
      .catch(err => {
        //dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err)
      });
};

export const followUser = (followId) => (dispatch, getState) => {
  const userId = getState().auth.user._id;
  axios
    .put('/api/user/follow', {followId}, tokenConfig(getState))
    .then(res => {
      console.log(res.data)
      dispatch({ type: FOLLOW_USER, payload: {followId, userId}});
    })
    .catch(err => {
      //dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err)
    });
  
};

export const unFollowUser = (unfollowId) => (dispatch, getState) => {
  const userId = getState().auth.user._id;
  axios
    .put('/api/user/unfollow', {unfollowId}, tokenConfig(getState))
    .then(res => {
      console.log(res.data)
      dispatch({ type: UNFOLLOW_USER, payload: {unfollowId, userId}});
    })
    .catch(err => {
      //dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err)
    });
};




