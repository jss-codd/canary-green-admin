import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Image from "next/image";

import ButtonLoader from '../buttonLoader'
import { BUTTON_LOADER, LOGIN_SUCCESS } from '../../redux/actions';
import logo1 from "../../images/logo1.png";
import { storeExpiry } from '../../helpers/localstorage-helper';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .max(20, "Must be 20 characters or less")
        .min(8, "Must be 8 characters or more"),
});

interface LoaderState {
    buttonloader: boolean
}

interface AuthState {
    auth: any;
}

const Login = () => {
    const dispatch = useDispatch();

    const buttonloader = useSelector(
        (state: LoaderState) => state.buttonloader
    );

    const [errorText, setErrorText] = useState("");

    const { user: token } = useSelector(
        (state: AuthState) => state.auth
    );

    const baseUrl = process.env.API_PATH;
    const URI = "sign-in";

    useEffect(() => {
        if (token.token) {
            Router.push("/dashboard");
        }
    }, []);

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    dispatch({
                        type: BUTTON_LOADER,
                    });
                    axios.post(`${baseUrl}${URI}`, values)
                        .then((res) => {
                            dispatch({
                                type: BUTTON_LOADER,
                            });
                            setErrorText('');
                            if (res.data.token) {
                                localStorage.setItem("canary_user", JSON.stringify(res.data));
                                storeExpiry("canary_user_auth_token", res.data.token, ((Number(res.data.expiryDuration) * 60000)/4), true);

                                dispatch({
                                    type: LOGIN_SUCCESS,
                                    payload: { user: res.data },
                                });

                                window.location.href = "/dashboard";
                            } else {
                                setErrorText('Request failed, Try again later!');
                            }
                        }).catch(error => {
                            dispatch({
                                type: BUTTON_LOADER,
                            });

                            console.log('error', error)
                            setErrorText('Email or password is incorrect!');
                        });
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <>
                        <div className="Auth-form-container">
                            <form className="Auth-form" onSubmit={handleSubmit}>
                                <div className="Auth-form-content">
                                    {errorText !== "" && (
                                        <div className="alert alert-danger" role="alert">
                                            {errorText}
                                        </div>
                                    )}
                                    <div className="text-center"><Image
                                        src={logo1}
                                        alt="logo"
                                        width="100px"
                                        height="90px"
                                    /></div>

                                    <h3 className="Auth-form-title">Sign In </h3>
                                    <div className="form-group mt-3">
                                        <label>Email address</label>
                                        <input
                                            type="email"
                                            name='email'
                                            className="form-control mt-1"
                                            placeholder="Enter email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                        <label className="error-input">{errors.email && touched.email && errors.email}</label>
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name='password'
                                            className="form-control mt-1"
                                            placeholder="Enter password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                        />
                                        <label className="error-input">{errors.password && touched.password && errors.password}</label>
                                    </div>
                                    <div className="d-grid gap-2 mt-3">
                                        {!buttonloader && (
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        )}
                                        {buttonloader && (
                                            <ButtonLoader text="Authenticating" />
                                        )}
                                    </div>
                                    <p className="text-center mt-2">
                                        Forgot <a href="#">password?</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </>
                )
                }
            </Formik>
        </div>
    );
}
export default Login;