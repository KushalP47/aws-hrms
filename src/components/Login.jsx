import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthLayout.jsx';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { authenticate } = useContext(AuthContext);

    const onSubmit = (e) => {
        e.preventDefault();
        
        authenticate(email, password)
        .then((data) => {
            console.log("Logged in!", data)
        })
        .catch((err) => {
            console.error("Failed to login!", err)
        });
    }
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-yellow">Login</h2>
                <form onSubmit={onSubmit} className="space-y-6">
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