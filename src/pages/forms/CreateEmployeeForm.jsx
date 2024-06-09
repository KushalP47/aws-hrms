import React, { useEffect } from 'react';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import employeeService from '../../aws/employee.js';
import authService from '../../aws/auth.js';
import { login } from '../../store/authSlice.js';
import { Link } from 'react-router-dom';
import cloudsync from '../../assets/cloud-sync.svg'; // Adjust the path based on your file structure
import Groups from '../../assets/Group.svg';

function CreateEmployeeForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { email, password } = location.state || {};
    const { register, handleSubmit, formState: { errors } } = useForm();
    const logoSrc = Groups; // Replace with your actual logo link
    const illustrationSrc = cloudsync; // Replace with your actual illustration link
    const user_id = useSelector(state => state.auth.user_id);
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const token = useSelector(state => state.auth.token);
    const createEmployee = async ({ email, name, department, position, salary }) => {
        try {
            const date_of_join = new Date().toISOString().split('T')[0].split('-').reverse().join('-');
            const formData = { user_id, isAdmin, email, name, department, position, salary, date_of_join };
            const data = await employeeService.createEmployee({ token, body: formData});
            if (data) {
                console.log("Employee Created Successfully");
                if(isAdmin){
                    console.log("Admin Dashboard");
                    navigate("/admin/dashboard");
                }
                else{
                    navigate("/employee/dashboard");
                }
            }
        } catch (error) {
            console.error("Employee Creation Failed", error.message);
        }
    };

    const checkUserRole = async ({ email, token }) => {
        const isAdmin = await authService.getUserRole({ email, token });
        console.log("isAdmin", isAdmin);
        return isAdmin;
    };

    useEffect(() => {
        // log in the user first
        async function signin ({ email, password }) {
            try {
                console.log("Signing in with email and password: ", email, password);
                const data = await authService.login({ email, password });
                console.log(data);
                if (data) {
                    console.log("Login Success");
                    // Getting user session
                    const session = await authService.getSession();
                    console.log("Got session!", session);
    
                    // Get user role
                    const token = session.getIdToken().jwtToken;
                    const email = session.getIdToken().payload.email;
                    const isAdmin = await checkUserRole({ email, token });
                    const user_id = session.getIdToken().payload.sub;
                    dispatch(login({ email, token, isAdmin, user_id }));
                    console.log("Logged in as: ", email);
                } 
            } catch (error) {
                console.error("Login Failed", error.message);
            }
        };

        // confirm the signup
        signin({ email, password });
    }, []);

    return (
        <div className="flex min-h-screen">
            {/* Navbar */}
            <nav className="bg-black opacity-75 text-white w-1/5 flex flex-col justify-between p-4">
                {/* Logo Section */}
                <div className="mb-8">
                    <img src={logoSrc} alt="Logo" className="h-12" /> {/* Adjust height as needed */}
                </div>
                
                {/* Nav Items Section */}
                <ul className="flex-1 space-y-4 text-xl">
                    <li>
                        <div className="block py-2 px-4 rounded transition duration-300">Dashboard</div>
                    </li>
                    <li>
                        <div className="block py-2 px-4 rounded transition duration-300">Attendance</div>
                    </li>
                    <li>
                        <div className="block py-2 px-4 rounded transition duration-300">Leaves</div>
                    </li>
                    <li>
                        <div className="block py-2 px-4 rounded transition duration-300">Payrolls</div>
                    </li>
                    <li>
                        <div className="block py-2 px-4 rounded transition duration-300">Feedback</div>
                    </li>
                    <li>
                        <div className="block py-2 px-4 rounded transition duration-300">Profile</div>
                    </li>
                </ul>
                
                {/* Logout Section */}
                <div className="mt-8">
                    <div className="w-full py-2 text-center px-4 font-semibold bg-yellow text-black rounded transition duration-300">
                        Logout
                    </div>
                </div>
            </nav>

            {/* Right Section */}
            <div className="bg-white w-4/5 border-4 border-yellow flex flex-col p-8">
                <form onSubmit={handleSubmit(createEmployee)} className="flex h-full p-2 border-4 border-black flex-row">
                    {/* Form Section */}
                    <div className="w-3/5 flex flex-col justify-center items-center pr-8">
                        {/* Title */}
                        <h1 className="text-4xl font-bold mb-8">Create Employee Account</h1>
                        {/* Input Fields */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-lg font-medium">Name</label>
                                <input
                                    type="text"
                                    {...register('name', { required: true })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                            </div>
                            <div>
                                <label className="block text-lg font-medium">Email</label>
                                <input
                                    type="email"
                                    {...register('email', { required: true })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                            </div>
                            <div>
                                <label className="block text-lg font-medium">Department</label>
                                <input
                                    type="text"
                                    {...register('department', { required: true })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {errors.department && <span className="text-red-500 text-sm">Department is required</span>}
                            </div>
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label className="block text-lg font-medium">Position</label>
                                    <input
                                        type="text"
                                        {...register('position', { required: true })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.position && <span className="text-red-500 text-sm">Position is required</span>}
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-lg font-medium">Salary</label>
                                    <input
                                        type="text"
                                        {...register('salary', { required: true })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.salary && <span className="text-red-500 text-sm">Salary is required</span>}
                                </div>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <div className="mt-8">
                            <button type="submit" className="w-full py-2 px-4 font-semibold hover:bg-yellow hover:text-black rounded bg-black text-yellow transition duration-300">
                                Create Employee
                            </button>
                        </div>
                    </div>

                    {/* Illustration Section */}
                    <div className="w-2/5 flex justify-center items-center">
                        <img 
                            src={illustrationSrc} 
                            alt="Illustration" 
                            className="w-full h-auto max-w-md"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateEmployeeForm;
