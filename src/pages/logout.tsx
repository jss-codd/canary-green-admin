import { useDispatch } from 'react-redux'
import { useEffect } from "react";

import { logout } from '../services/UserServices';

const Logout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        logout(dispatch);
    }, []);

    return (<></>);
};

export default Logout;