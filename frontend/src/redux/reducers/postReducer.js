import { ADD_POST,LOADING_POSTS,LOAD_POSTS } from '../constants/types'

const initialState = {
  posts:[],
  loading:false
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOADING_POSTS:
        return {...state, loading:true}
      case ADD_POST:
        return {
          ...state,
          posts: [action.payload, ...state.posts]
        }
      case LOAD_POSTS:
        return {
          ...state,
          loading:false,
          posts:action.payload
        }
      default:
        return state;
    }
  };
  
  export default postReducer;