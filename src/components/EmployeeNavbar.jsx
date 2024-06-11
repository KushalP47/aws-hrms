import React from 'react'
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import logoSrc from '../assets/Group.svg'; // Adjust the path based on your file structure

function EmployeeNavbar({current}) {
    const active = "block py-2 px-4 rounded bg-yellow text-black transition duration-300";
    const inactive = "block py-2 px-4 rounded hover:text-yellow transition duration-300";

    // Function to determine the class based on the current route
    const getNavItemClass = (path) => current === path ? active : inactive;

    return (
        <nav className="bg-black text-white w-1/5 flex flex-col justify-between p-4">
            {/* Logo Section */}
            <div className="mb-8">
                <img src={logoSrc} alt="Logo" className="h-12" /> {/* Adjust height as needed */}
            </div>
            
            {/* Nav Items Section */}
            <ul className="flex-1 space-y-4 text-xl">
                <li>
                    <Link to="/employee/dashboard" className={getNavItemClass("Dashboard")}>Dashboard</Link>
                </li>
                <li>
                    <Link to="/employee/attendance" className={getNavItemClass("Attendance")}>Attendance</Link>
                </li>
                <li>
                    <Link to="/employee/leaves" className={getNavItemClass("Leaves")}>Leaves</Link>
                </li>
                <li>
                    <Link to="/employee/feedback" className={getNavItemClass("Feedback")}>Feedback</Link>
                </li>
                <li>
                    <Link to="/employee/tasks" className={getNavItemClass("Tasks")}>Tasks</Link>
                </li>
                <li>
                    <Link to="/employee/profile" className={getNavItemClass("Profile")}>Profile</Link>
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
    );
}

export default EmployeeNavbar
