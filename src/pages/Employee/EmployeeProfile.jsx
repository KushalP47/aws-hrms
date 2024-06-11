import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import illustration from '../../assets/buildings.svg'; // Adjust the path based on your file structure
import logo from '../../assets/Group.svg'; // Adjust the path based on your file structure
import { useSelector } from 'react-redux';
import employeeService from '../../aws/employee.js';
import EmployeeNavbar from '../../components/EmployeeNavbar.jsx';

const EmployeeProfile = () => {
    const logoSrc = logo;
    const illustrationSrc = illustration; 
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = useSelector(state => state.auth.token);
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
            <EmployeeNavbar current="Profile"/>

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

export default EmployeeProfile;
