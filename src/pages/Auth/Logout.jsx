import React from 'react'
import authService from '../../aws/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice.js';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signout = async() => {
        await authService.logout();
        dispatch(logout());
        console.log("Logged out");
        navigate('/landing-page');
    }
    return (
        <>
            <button onClick={signout} className="bg-yellow text-black font-bold py-2 px-4 rounded">Logout</button>
        </>
    )
}

export default Logout
