import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';
import { createStore } from 'redux';
import allReducer from '../redux/reducers';
import { Provider, useDispatch, useSelector } from 'react-redux';
import React from 'react';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RouteGuard } from '../components/RouteGuard';
import { checkRefreshToken } from "../helpers/refreshToken"

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

Router.events.on('routeChangeStart', (route: string) => {
  checkRefreshToken(route);
});

// For GET requests
axios.interceptors.request.use(
  (req) => {
    // Add configurations here
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
    // Add configurations here
    if (res.status === 401 || res.status === 403) {
      Router.push('./logout')
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  const store = createStore(allReducer);

  return (
    <Provider store={store}>
      <React.StrictMode>
        <RouteGuard>
        <Component {...pageProps} />
        </RouteGuard>
      </React.StrictMode>
      <ToastContainer theme="dark" />
    </Provider>
  );
}

export default MyApp;