import React from 'react';
import authService from '../../aws/auth.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import illustration from '../../assets/mailbox.svg'; // Adjust the path based on your file structure
import Groups from '../../assets/Group.svg';

const ConfirmSignup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const logoSrc = Groups;

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
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-black p-4 flex justify-start items-center">
                <img src={logoSrc} alt="Logo" className="h-8" />
            </header>

            {/* Main Content */}
            <main className="flex-1 bg-white flex items-center justify-center">
                <div className="w-full h-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    <div className="flex justify-center border-4 border-black">
                        <img src={illustration} alt="Illustration" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                    {/* Confirm Signup Form */}
                    <div className="bg-white border-4 border-yellow p-8 rounded-lg shadow-lg flex flex-col justify-between">
                        <h2 className="text-4xl font-bold mb-6 mt-5 text-center text-black">Confirm Signup</h2>
                        <form onSubmit={handleSubmit(confirmSignup)} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
                                <input
                                    {...register("email", { required: true })}
                                    type="email"
                                    id="email"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {errors.email && <p className="text-red-500">Email is required.</p>}
                            </div>
                            <div>
                                <label htmlFor="code" className="block text-sm font-medium text-black">Verification Code</label>
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
                                    className="w-full flex justify-center py-2 px-4 border-4 border-transparent rounded-md shadow-sm text-sm font-medium bg-black text-yellow hover:bg-yellow hover:text-black"
                                >
                                    Confirm Signup
                                </button>
                            </div>
                        </form>
                    </div>
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

export default ConfirmSignup;