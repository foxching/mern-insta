import {
  GET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI
} from "../constants/types";

const initialState = {
  msg: {},
  status: null,
  id: null,
  loading: false
};

const uIReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
        loading: false
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
        loading: false
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default uIReducer;
