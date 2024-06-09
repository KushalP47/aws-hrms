import React from 'react';
import { Link } from 'react-router-dom';
import illustration from '../../assets/buildings.svg'; // Adjust the path based on your file structure
import logo from '../../assets/Group.svg'; // Adjust the path based on your file structure
const AdminAttendance = () => {
    const logoSrc = logo;
    const illustrationSrc = illustration; 

    return (
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
                        <Link to="/admin/attendance" className="block py-2 px-4 rounded  bg-yellow text-black transition duration-300">Attendance</Link>
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
                        <Link to="/admin/profile" className="block py-2 px-4 rounded hover:text-yellow transition duration-300">Profile</Link>
                    </li>
                </ul>
                
                {/* Logout Section */}
                <div className="mt-8">
                    <button className="w-full py-2 px-4 bg-yellow text-black rounded hover:bg-white transition duration-300">
                        <Link>
                            Logout
                        </Link>
                    </button>
                </div>
            </nav>

            {/* Right Section */}
            <div className="bg-white w-4/5 border-4 border-yellow shadow-xl flex flex-col p-8">
                {/* Title Section */}
                <div className="flex justify-start mb-8">
                    <h1 className="text-4xl font-bold">Attendance</h1>
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

export default AdminAttendance;
