import {
  PROFILE_LOADING, PROFILE_LOADED
} from '../constants/types';


const initialState = {
    profile: {},
    isLoading:false,
    userPosts:[]
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
       case PROFILE_LOADING:
           return {
               ...state,
               isLoading:true
           }
        case PROFILE_LOADED:
            return {
                ...state,
                isLoading:false,
                profile:action.payload.user,
                userPosts:action.payload.posts
            }
        default:
            return state;
    }
}

export default userReducer