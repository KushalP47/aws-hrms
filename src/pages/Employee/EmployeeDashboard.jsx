import React from 'react';
import { Link } from 'react-router-dom';
import illustration from '../../assets/buildings.svg'; // Adjust the path based on your file structure
import EmployeeNavbar from '../../components/EmployeeNavbar.jsx';
import logo from '../../assets/Group.svg'; // Adjust the path based on your file structure
const EmployeeDashboard = () => {
    const logoSrc = logo;
    const illustrationSrc = illustration; 

    return (
        <div className="flex min-h-screen">
            {/* Navbar */}
            <EmployeeNavbar current="Dashboard"/>

            {/* Right Section */}
            <div className="bg-white w-4/5 border-4 border-yellow shadow-xl flex flex-col p-8">
                {/* Title Section */}
                <div className="flex justify-start mb-8">
                    <h1 className="text-4xl font-bold">Profile</h1>
                </div>
                
                {/* Content Section */}
                <div className="flex-1 flex shadow-lg border-4 border-black rounded-lg justify-center items-center">
                    <img 
                        src={illustrationSrc} 
                        alt="Illustration" 
                        className="w-full h-auto max-w-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
