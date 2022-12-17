import Router from "next/router";

import { readExpiry, storeExpiry } from "./localstorage-helper";
import { publicPaths } from "../components/RouteGuard";
import { authHeader } from "./auth-header";
import axios from "axios";

export const checkRefreshToken = (routerName: string) => {
    
    let path = routerName?.split("?")[0];
    path = "/" + path?.split('/')[1];

    const baseURL = process.env.API_PATH + 'refresh-token';

    const unprotectedRouteNames = publicPaths;
    // For Protected Routes
    if (!unprotectedRouteNames.includes(path) && path != "") {
        try {
            const token = readExpiry("canary_user_auth_token");
            // if token is available and not expired
            if (token.response != null && token.expired === false) {
                return true;
            }

            // if token is available and expired
            if (token.response != null && token.expired === true) {
                // attempt to refresh token
                const defaultOptions = {
                    headers: {
                        ...authHeader(),
                    },
                };
                axios.post(baseURL, {"refreshToken": ""}, { ...defaultOptions })
                    .then((res) => {console.log('res',res)
                        if (res.data.status) {
                            localStorage.setItem("canary_user", JSON.stringify(res.data));
                            storeExpiry("canary_user_auth_token", res.data.token, ((Number(res.data.expiryDuration) * 60000 / 4)), true);
                            return true;
                        } else {
                            window.location.href = './logout';
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        window.location.href = './logout';
                    });
            }
            // if token is unavailable
            if (token == null || token.response == null) {
                window.location.href = './logout';
            }
        } catch (e) {
            console.log(e)
            window.location.href = './logout';
        }
    } else {
        return true;
    }
}