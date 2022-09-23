import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";

import { logout } from '../services/UserServices';
import Router from 'next/router';

const Logout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        logout(dispatch);
    }, []);

    return (<></>);
};

export default Logout;
