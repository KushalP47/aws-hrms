import React, { useState } from 'react';
import authService from '../aws/auth.js';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice.js';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [currentSession, setCurrentSession] = useState({});
    const dispatch = useDispatch();

    const checkUserRole = async ({ email, token }) => {
        const isAdmin = await authService.getUserRole({ email, token });
        console.log("isAdmin", isAdmin);
        return isAdmin;
    };

    const signin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await authService.login({ email, password });
            console.log(data);
            if (data) {
                console.log("Login Success");
                // Getting user session
                const session = await authService.getSession();
                console.log("Got session!", session);
                setCurrentSession(session);

                // Get user role
                const token = session.getIdToken().jwtToken;
                const email = session.getIdToken().payload.email;
                const isAdmin = await checkUserRole({ email, token });

                dispatch(login({ email, token, isAdmin }));
                console.log("Logged in as: ", email);
                
            } else {
                console.log("Login Failed", error);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-yellow">Login</h2>
                <form onSubmit={signin} className="space-y-6">
                    <div>
                        <label htmlFor="useremail" className="block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            id="useremail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="userpassword" className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            id="userpassword"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border-4 border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow hover:border-yellow hover:bg-white"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;