import { toast } from "react-toastify";

import { authHeader } from "./auth-header";
import { logout } from "../services/UserServices";

export const fetchWrapper = {
    getNoAuth,
    postWithAuth,
    postNoAuth,
    putNoAuth,
    handler,
    getWithAuth,
    putWithAuth,
};

function getNoAuth(url: RequestInfo) {
    const requestOptions = {
        method: "GET"
    };
    return fetch(url, requestOptions);
}

function getWithAuth(url: RequestInfo) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return fetch(url, requestOptions);
}

function postNoAuth(url: RequestInfo, body: any) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    };
    return fetch(url, requestOptions);
}

function postWithAuth(url: RequestInfo, body: any) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify(body),
    };
    return fetch(url, requestOptions);
}

function putNoAuth(url: RequestInfo, body: any) {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    };
    return fetch(url, requestOptions);
}

function putWithAuth(url: RequestInfo, body: any) {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify(body),
    };
    return fetch(url, requestOptions);
}

function handler(res: any, dispatch: (arg0: { type: string; }) => void) {
    if (res.status == 403 || res.status == 406 || res.status == 401) {
        logout(dispatch);
        toast.error('Unauthorized access');
        return;
    } else if (res.status == 400) {
        toast.error('Bad Request');
        return;
    } else if (res.status == 422) {
        res.json().then((data: { message: any; }) => {
            toast.error(data.message || "Unprocessable entity found");
            return;
        })
        return;
    } else if (res.status == 200) {
    } else {
        toast.error("Something gone wrong! Try again later.");
        return;
    }
    return res;
}