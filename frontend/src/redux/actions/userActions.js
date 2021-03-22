import axios from "axios";
import {PROFILE_LOADING, PROFILE_LOADED} from "../constants/types";
import { tokenConfig } from "./authActions";


export const getUserProfile = (username) => (dispatch, getState) => {
    dispatch({ type: PROFILE_LOADING });
    axios
      .get(`/api/user/${username}`, tokenConfig(getState))
      .then(res => {
        console.log(res.data)
        dispatch({ type: PROFILE_LOADED, payload: res.data });
      })
      .catch(err => {
        //dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err)
      });
};


