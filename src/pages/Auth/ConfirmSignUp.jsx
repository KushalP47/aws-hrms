import React from 'react';
import authService from '../../aws/auth.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const ConfirmSignup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const confirmSignup = async ({ email, code }) => {
        try {
            const data = await authService.confirmSignUp({ email, code });
            console.log(data);
            if (data) {
                console.log("Confirmation Success");
                navigate("/auth/login");
            }
        } catch (error) {
            console.error("Confirmation Failed", error.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-yellow">Confirm Signup</h2>
                <form onSubmit={handleSubmit(confirmSignup)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.email && <p className="text-red-500">Email is required.</p>}
                    </div>
                    <div>
                        <label htmlFor="code" className="block text-sm font-medium text-white">Verification Code</label>
                        <input
                            {...register("code", { required: true })}
                            type="text"
                            id="code"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.code && <p className="text-red-500">Verification code is required.</p>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border-4 border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow hover:border-yellow hover:bg-white"
                        >
                            Confirm Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ConfirmSignup;