import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  error: errorsReducer,
  post: postReducer,
  user: userReducer
});
