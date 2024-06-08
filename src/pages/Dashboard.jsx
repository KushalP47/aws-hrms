import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../components/';
import { useSelector } from 'react-redux';

function Dashboard() {
    const authStatus = useSelector(state => state.auth.status);
    const [flag, setFlag] = React.useState(false);

    useEffect(() => {
        if (authStatus) {
            setFlag(true);
        } else {
            setFlag(false);
        }
    }, [authStatus]);

    if(flag){
        return (
            <div>
                <h1>Dashboard</h1>
                <Logout />
            </div>
        )
    
    }else{
        return (
            <div>
                <h1>Dashboard</h1>
                <p>You are not logged in</p>
                <Link to="/login" className="bg-yellow text-black font-bold py-2 px-4 rounded">Login</Link>
                <Link to="/signup" className="bg-yellow text-black font-bold py-2 px-4 rounded">Signup</Link>
            </div>
        )
    }
}

export default Dashboard
