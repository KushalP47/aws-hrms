import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthLayout.jsx';

const Status = () => {

    const { getSession, logout } = useContext(AuthContext);

    const [session, setSession] = useState(false);

    useEffect(() => {
        getSession()
        .then((session) => {
            console.log("Got session!", session);
            setSession(session);
        })
        .catch((err) => {
            console.error("Failed to get session!", err);
        });
    }, []);

    return (
        <div>
            {session ? (
                <div>
                    <h2>Session</h2>
                    {/* <p>{JSON.stringify(session)}</p> */}
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h2>No session</h2>
                    <button onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default Status;