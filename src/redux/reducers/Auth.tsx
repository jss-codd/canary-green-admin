import { LOGIN_SUCCESS, LOGOUT } from "../actions";

let user = {};

const ISSERVER = typeof window === "undefined";
if (!ISSERVER) {
  user = JSON.parse(localStorage.getItem("canary_user") || '{}');
}

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authReducer = (state = initialState, action: { type: any; payload: any; }) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;