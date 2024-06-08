import React, { useState } from 'react';
import authService from '../../aws/auth.js';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const checkUserRole = async ({ email, token }) => {
        const isAdmin = await authService.getUserRole({ email, token });
        console.log("isAdmin", isAdmin);
        return isAdmin;
    };

    const signin = async ({ email, password }) => {
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
                
                if (isAdmin) {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/employee/dashboard");
                }
            } 
        } catch (error) {
            console.error("Login Failed", error.message);
        }
    };
    

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-black p-4 flex justify-start items-center">
                <img src={logoSrc} alt="Logo" className="h-8" />
            </header>

            {/* Main Content */}
            <main className="flex-1 bg-white flex items-center justify-center">
                <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-yellow">Login</h2>
                    <form onSubmit={handleSubmit(signin)} className="space-y-6">
                        <div>
                            <label htmlFor="useremail" className="block text-sm font-medium text-white">Email</label>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                id="useremail"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.email && <p className="text-red-500">Email is required.</p>}
                        </div>
                        <div>
                            <label htmlFor="userpassword" className="block text-sm font-medium text-white">Password</label>
                            <input
                                {...register("password", { required: true })}
                                type="password"
                                id="userpassword"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.password && <p className="text-red-500">Password is required.</p>}
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
            </main>

            {/* Footer */}
            <footer className="bg-black p-8 flex flex-col md:flex-row items-start md:items-center justify-between text-yellow">
                <img src={logoSrc} alt="Logo" className="h-12 mb-4 md:mb-0" />
                {/* Footer content */}
                <div className="flex flex-col md:flex-row md:space-x-8">
                    <div className="mb-4 md:mb-0">
                        <h4 className="text-xl font-semibold">Company</h4>
                        <ul className="space-y-2">
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h4 className="text-xl font-semibold">Contact</h4>
                        <ul className="space-y-2">
                            <li>Email: contact@yourcompany.com</li>
                            <li>Phone: +123 456 7890</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Login;