import { combineReducers } from "redux";
import authReducer from "./authReducer";
import uiReducer from "./uiReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  ui: uiReducer,
  post: postReducer,
  user: userReducer
});
