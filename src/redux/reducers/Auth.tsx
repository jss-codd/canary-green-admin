import { createSlice } from '@reduxjs/toolkit'

let user = {};

const ISSERVER = typeof window === "undefined";
if (!ISSERVER) {
    user = JSON.parse(localStorage.getItem("canary_user") || "{}");
}

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAction: (state, action) => {
            const { payload } = action
            state.isLoggedIn = true
            state.user = payload.user
        },
        logoutAction: (state) => {
            state.isLoggedIn = false
            state.user = null
        }
    },
})

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;