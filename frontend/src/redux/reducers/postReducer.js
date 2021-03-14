import { ADD_POST,LOADING_POSTS,LOAD_ALL_POSTS,LOAD_USER_POSTS,LOAD_MY_POSTS } from '../constants/types'

const initialState = {
  allPosts:[],
  myPosts:[],
  userPosts:[],
  loading:false
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOADING_POSTS:
        return {...state, loading:true}
      case ADD_POST:
        return {
          ...state,
          allPosts: [action.payload, ...state.allPosts]
        }
      case LOAD_ALL_POSTS:
        return {
          ...state,
          loading:false,
          allPosts:action.payload
        }
      case LOAD_MY_POSTS:
        return {
          ...state,
          loading:false,
          myPosts:action.payload
        }
      default:
        return state;
    }
  };
  
  export default postReducer;