import axios from 'axios';
import { ADD_POST } from '../constants/types';
import { tokenConfig } from "./authActions";
import { returnErrors} from "./errorActions"
import M from 'materialize-css'



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