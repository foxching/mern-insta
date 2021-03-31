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

const initialState = {
  allPosts: [],
  myPosts: [],
  userPosts: [],
  loading: false
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_POSTS:
      return { ...state, loading: true };
    case ADD_POST:
      return {
        ...state,
        allPosts: [action.payload, ...state.allPosts]
      };
    case LOAD_ALL_POSTS:
      return {
        ...state,
        loading: false,
        allPosts: action.payload
      };
    case LOAD_MY_POSTS:
      return {
        ...state,
        loading: false,
        myPosts: action.payload
      };
    case TOGGLE_LIKE_UNLIKE_POST:
      return {
        ...state,
        allPosts: state.allPosts.map(post => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              likes: post.likes.includes(action.payload.userId)
                ? [...post.likes.filter(_id => _id !== action.payload.userId)]
                : [...post.likes, action.payload.userId]
            };
          } else {
            return post;
          }
        })
      };
    case ADD_COMMENT:
      return {
        ...state,
        allPosts: state.allPosts.map(post => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              comments: [...post.comments, action.payload.comment]
            };
          } else {
            return post;
          }
        })
      };
    case DELETE_POST:
      return {
        ...state,
        allPosts: [
          ...state.allPosts.filter(allPost => allPost._id !== action.payload)
        ]
      };
    case DELETE_COMMENT:
      return {
        ...state,
        allPosts: state.allPosts.map(post => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              comments: [
                ...post.comments.filter(c => c._id !== action.payload.commentId)
              ]
            };
          } else {
            return post;
          }
        })
      };
    default:
      return state;
  }
};

export default postReducer;
