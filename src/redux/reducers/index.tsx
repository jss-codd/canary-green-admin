import authReducer from "./Auth";
import buttonLoaderReducer from "./ButtonLoader";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  auth: authReducer,
  buttonloader: buttonLoaderReducer
});

export default allReducers;