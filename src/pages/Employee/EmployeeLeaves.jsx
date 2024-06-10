import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import illustration from '../../assets/buildings.svg';  
import logo from '../../assets/Group.svg'; 
import { useSelector } from 'react-redux';
import leavesService from '../../aws/leaves.js';
import { useForm } from 'react-hook-form';
import employeeService from '../../aws/employee.js';

const EmployeeLeaves = () => {
    const logoSrc = logo;
    const illustrationSrc = illustration; 
    const token = useSelector(state => state.auth.token);
    const user_id = useSelector(state => state.auth.user_id);
    const email = useSelector(state => state.auth.email);
    const [leaves, setLeaves] = useState(null);
    const [leaveUpdated, setLeaveUpdated] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const userData = employeeService.getEmployee({ token, user_id });
        const leave = {
            leave_id: String(Math.floor(Math.random() * 1000)),
            user_id: user_id,
            name: userData.name,
            email: email,
            status: "Pending",
            from: data.start_date,
            to: data.end_date,
            reason: data.reason
        };
        createLeave(leave);
    };

    const createLeave = async (body) => {
        const data = await leavesService.createLeave({ token, body });
        if(data) {
            fetchLeaves();
            setLeaveUpdated(leaveUpdated + 1);
            return true;
        }
        return false;
    };

    const fetchLeaves = async () => {
        try {
            const data = await leavesService.getLeaveList({ token });
            data.filter(leave => leave.user_id === user_id);
            console.log(data);
            setLeaves(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, [leaveUpdated])

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
                        <Link to="/employee/dashboard" className="block py-2 px-4 rounded  hover:text-yellow transition duration-300">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/employee/attendance" className="block py-2 px-4 rounded  hover:text-yellow transition duration-300">Attendance</Link>
                    </li>
                    <li>
                        <Link to="/employee/leaves" className="block py-2 px-4 rounded  bg-yellow text-black transition duration-300">Leaves</Link>
                    </li>
                    <li>
                        <Link to="/employee/payrolls" className="block py-2 px-4 rounded hover:text-yellow transition duration-300">Payrolls</Link>
                    </li>
                    <li>
                        <Link to="/employee/feedback" className="block py-2 px-4 rounded hover:text-yellow transition duration-300">Feedback</Link>
                    </li>
                    <li>
                        <Link to="/employee/profile" className="block py-2 px-4 rounded hover:text-yellow transition duration-300">Profile</Link>
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
                    <h1 className="text-4xl font-bold">Leaves</h1>
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

export default EmployeeLeaves;
