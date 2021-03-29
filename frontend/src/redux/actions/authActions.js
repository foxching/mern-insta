import axios from "axios";
import { returnErrors } from "./errorActions.js";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOADING_UI
} from "../constants/types";
import { url } from "../../api/url";
import M from "materialize-css";

// load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get(`${url}/api/auth/user`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({ name, email, password, pic }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password, pic });
  dispatch({ type: LOADING_UI });
  axios
    .post(`${url}/api/auth/signup`, body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      M.toast({ html: res.data.msg, classes: "#43a047 green darken-1" });
    })
    .catch(err => {
      M.toast({ html: err.response.data.msg, classes: "#c62828 red darken-3" });
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });
  dispatch({ type: LOADING_UI });
  axios
    .post(`${url}/api/auth/login`, body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      M.toast({ html: res.data.msg, classes: "#43a047 green darken-1" });
    })
    .catch(err => {
      M.toast({ html: err.response.data.msg, classes: "#c62828 red darken-3" });
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_SUCCESS });
  //clear user todos
};

//setup config headers/token
export const tokenConfig = getState => {
  //get token
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
