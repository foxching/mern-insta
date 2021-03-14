import axios from 'axios';
import { ADD_POST, LOADING_POSTS, LOAD_POSTS } from '../constants/types';
import { tokenConfig } from "./authActions";
import { returnErrors} from "./errorActions"
import M from 'materialize-css'


export const getAllPost = () => (dispatch, getState) => {
    dispatch({ type: LOADING_POSTS });
    axios
        .get("/api/post/allPost", tokenConfig(getState))
        .then(res => {
            dispatch({ type: LOAD_POSTS, payload: res.data });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}


export const createPost = (post,history) => (dispatch,getState) => {
    axios
        .post("/api/post/createPost", post, tokenConfig(getState))
        .then(res => {
            dispatch({ type: ADD_POST, payload: res.data.newPost });
            M.toast({html:res.data.msg, classes:"#43a047 green darken-1"})
            history.push("/")
        })
        .catch(err =>{
            M.toast({html: err.response.data.msg, classes:"#c62828 red darken-3"})
            dispatch(returnErrors(err.response.data, err.response.status))
        });
}