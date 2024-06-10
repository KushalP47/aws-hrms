import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import illustration from '../../assets/buildings.svg'; // Adjust the path based on your file structure
import logo from '../../assets/Group.svg'; // Adjust the path based on your file structure
import { useSelector } from 'react-redux';
import employeeService from '../../aws/employee.js';

const AdminProfile = () => {
    const logoSrc = logo;
    const illustrationSrc = illustration; 
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = useSelector(state => state.auth.token);
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const userId = useSelector(state => state.auth.user_id);

    useEffect(() => {
        setLoading(true);
        employeeService.getEmployee({token, id: userId})
            .then(data => {
                setEmployee(data);
                // console.log(data);
                // console.log(employee);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // Example employee object
    // employee : {
    //     id: "123",
    //     name: "John Doe",
    //     email: "",
    //     department: "",
    //     position: "",
    //     date_of_join: "",
    //     salary: "",
    // }

    const handleUpdate = () => {
        // Implement update logic here
    };

    return !loading ? (
        <div className="flex min-h-screen">
            {/* Navbar */}
            <nav className="bg-black text-white w-1/5 flex flex-col justify-between p-4">
                {/* Logo Section */}
                <div className="mb-8">
                    <img src={logoSrc} alt="Logo" className="h-12" /> {/* Adjust height as needed */}
                </div>
                
                {/* Nav Items Section */}
                <ul className="flex-1 space-y-4 text-xl">
                    <li>
                        <Link to="/admin/dashboard" className="block py-2 px-4 rounded  hover:text-yellow transition duration-300">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/attendance" className="block py-2 px-4 rounded  hover:text-yellow transition duration-300">Attendance</Link>
                    </li>
                    <li>
                        <Link to="/admin/leaves" className="block py-2 px-4 rounded  hover:text-yellow transition duration-300">Leaves</Link>
                    </li>
                    <li>
                        <Link to="/admin/payrolls" className="block py-2 px-4 rounded hover:text-yellow transition duration-300">Payrolls</Link>
                    </li>
                    <li>
                        <Link to="/admin/feedback" className="block py-2 px-4 rounded hover:text-yellow transition duration-300">Feedback</Link>
                    </li>
                    <li>
                        <Link to="/admin/profile" className="block py-2 px-4 rounded text-black bg-yellow transition duration-300">Profile</Link>
                    </li>
                </ul>
                
                {/* Logout Section */}
                <div className="mt-8">
                    <button className="w-full py-2 px-4 bg-black text-yellow border-4 border-yellow rounded hover:bg-yellow hover:text-black hover:border-black transition duration-300">
                        <Link to="/auth/logout">
                            Logout
                        </Link>
                    </button>
                </div>
            </nav>

            {/* Right Section */}
            <div className="bg-white w-4/5 border-4 border-yellow shadow-xl flex flex-col p-8">
                {/* Title Section */}
                <div className="flex justify-start mb-8">
                    <h1 className="text-4xl font-bold">Profile</h1>
                </div>
                
                {/* Content Section */}
                 <div className="flex-1 flex shadow-lg border-4 border-black rounded-lg p-8">
                    {/* Left Section (Illustration) */}
                    <div className="w-2/5 flex justify-center items-center">
                        <img 
                            src={illustrationSrc} 
                            alt="Illustration" 
                            className="w-full h-auto max-w-md"
                        />
                    </div>
                    
                    {/* Right Section (Form Details) */}
                    <div className="w-3/5 flex flex-col justify-between p-8 bg-white border-l-4 border-black">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Employee Details</h2>
                            {employee && (
                                <>
                                    <p className="text-xl mb-4"><span className="font-semibold">Name:</span> {employee.name}</p>
                                    <p className="text-xl mb-4"><span className="font-semibold">User ID:</span> {employee.user_id}</p>
                                    <p className="text-xl mb-4"><span className="font-semibold">Email:</span> {employee.email}</p>
                                    <p className="text-xl mb-4"><span className="font-semibold">isAdmin:</span> {employee.isAdmin ? "Yes" : "No"}</p>
                                    <p className="text-xl mb-4"><span className="font-semibold">Department:</span> {employee.department}</p>
                                    <p className="text-xl mb-4"><span className="font-semibold">Position:</span> {employee.position}</p>
                                    <p className="text-xl mb-4"><span className="font-semibold">Date of Join:</span> {employee.date_of_join}</p>
                                    <p className="text-xl mb-4"><span className="font-semibold">Salary:</span> {employee.salary}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default AdminProfile;
