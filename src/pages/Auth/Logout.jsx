import React, { useEffect, useState } from 'react'
import authService from '../../aws/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice.js';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const signout = async () => {
            setLoading(true);
            await authService.logout();
            dispatch(logout());
            setLoading(false);
            console.log("Logged out");
            navigate('/landing-page');
        }
        signout();
    }, [])

    return !loading ? (
        <>
            <h1>Logout</h1>
        </>
    ) : null
}

export default Logout
