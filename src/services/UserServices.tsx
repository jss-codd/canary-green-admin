import { LOGOUT } from "../redux/actions";
import { fetchWrapper } from "../helpers/fetch-wrapper";

export const logout = (
  dispatch: (arg0: { type: string }) => void,
  redirect = true
) => {
  localStorage.removeItem("canary_user");
  localStorage.removeItem("canary_user_auth_token");
  localStorage.removeItem("canary_user_auth_token.e");
  dispatch({
    type: LOGOUT,
  });
  if (redirect) {
    location.href = "/login";
  }
};

export const commonFetchAll = async (
  endpoint: string,
  dispatch: (arg0: { type: string }) => void
) => {
  try {
    const response = await fetchWrapper.getNoAuth(
      `${process.env.API_PATH_USER}${endpoint}`
    );
    const res = fetchWrapper.handler(response, dispatch);
    return res;
  } catch (error) {
    console.log(error);
  }
};