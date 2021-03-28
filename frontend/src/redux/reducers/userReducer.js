import {
  LOGOUT_SUCCESS,
  PROFILE_LOADING,
  PROFILE_LOADED,
  FOLLOW_USER,
  UNFOLLOW_USER,
  UPDATE_PROFILE_PHOTO
} from "../constants/types";

const initialState = {
  profile: {},
  isLoading: false,
  userPosts: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case PROFILE_LOADED:
      return {
        ...state,
        isLoading: false,
        profile: action.payload.user,
        userPosts: action.payload.posts
      };
    case FOLLOW_USER:
      return {
        ...state,
        profile: {
          ...state.profile,
          followers: [...state.profile.followers, action.payload.userId]
        }
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        profile: {
          ...state.profile,
          followers: [
            ...state.profile.followers.filter(
              id => id !== action.payload.userId
            )
          ]
        }
      };
    case UPDATE_PROFILE_PHOTO:
      return {
        ...state,
        profile: {
          ...state.profile,
          pic: action.payload.pic
        }
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        profile: {},
        isLoading: false,
        userPosts: []
      };
    default:
      return state;
  }
};

export default userReducer;
