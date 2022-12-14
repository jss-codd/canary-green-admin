import { fetchWrapper } from "../helpers/fetch-wrapper";
import { AnyAction, Dispatch } from "redux";
import { logoutAction } from "../redux/reducers/Auth";

export const logout = (
  dispatch: (arg0: { type: string }) => void,
  redirect = true
) => {
  localStorage.removeItem("canary_user");
  localStorage.removeItem("canary_user_auth_token");
  localStorage.removeItem("canary_user_auth_token.e");

  dispatch(logoutAction());
  if (redirect) {
    location.href = "/login";
  }
};

export const commonFetchAllUser = async (
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

export const commonFetchAll = async (
  endpoint: string,
  dispatch: (arg0: { type: string }) => void
) => {
  try {
    const response = await fetchWrapper.getNoAuth(
      `${process.env.API_PATH}${endpoint}`
    );
    const res = fetchWrapper.handler(response, dispatch);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const commonFetchAllAuth = async (
  endpoint: string,
  dispatch: (arg0: { type: string }) => void
) => {
  try {
    const response = await fetchWrapper.getWithAuth(
      `${process.env.API_PATH}${endpoint}`
    );
    const res = fetchWrapper.handler(response, dispatch);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// common function for submit
export const commonSubmit = async (data: any, endpoint: string, dispatch: Dispatch<AnyAction>) => {
  try {
    const response = await fetchWrapper.postWithAuth(
      `${process.env.API_PATH}${endpoint}`,
      data
    );
    const res = fetchWrapper.handler(response, dispatch);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const commonUpload = async (data: any, endpoint: string, dispatch: Dispatch<AnyAction>) => {
  try {
    const response = await fetchWrapper.fileWithAuth(
      `${process.env.API_PATH}${endpoint}`,
      data
    );
    const res = fetchWrapper.handler(response, dispatch);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const commonPut = async (data: object, id: Number, endpoint: string, dispatch: Dispatch<AnyAction>, prm1: any = "") => {
  try {
    const response = await fetchWrapper.putWithAuth(
      `${process.env.API_PATH}${endpoint}/${id}/${prm1}`,
      data
    );
    const res = fetchWrapper.handler(response, dispatch);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// common function for submit
export const commonSubmitNoAuthUser = async (data: any, endpoint: string, dispatch: Dispatch<AnyAction>) => {
  try {
    const response = await fetchWrapper.postNoAuth(
      `${process.env.API_PATH_USER}${endpoint}`,
      data
    );
    const res = fetchWrapper.handler(response, dispatch);
    return res;
  } catch (error) {
    console.log(error);
  }
};