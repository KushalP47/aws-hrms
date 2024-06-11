import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import illustration from '../../assets/buildings.svg';  
import logo from '../../assets/Group.svg'; 
import { useSelector } from 'react-redux';
import leavesService from '../../aws/leaves.js';
import { useForm } from 'react-hook-form';
import employeeService from '../../aws/employee.js';
import EmployeeNavbar from '../../components/EmployeeNavbar.jsx';

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
        console.log("user_id", user_id);
        console.log("token", token);    
        const userData = await employeeService.getEmployee({ token, id:user_id });
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
        createLeave({body: leave});
    };

    const createLeave = async ({body}) => {
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
        console.log("Leaves", leaves);
    }, [leaveUpdated])

    // example leave object {
    //     leave_id: "123",
    //     From: "10-09-24",
    //     To: "10-09-25",
    //     Reason: "Sick Leave",
    //     Status: "Pending",
    // }

    return (
        <div className="flex min-h-screen">
            {/* Navbar */}
            <EmployeeNavbar current="Leaves"/>

            {/* Right Section */}
            <div className="bg-white w-4/5 border-4 border-yellow shadow-xl flex flex-col p-8">
                {/* Title Section */}
                <div className="flex justify-start mb-8">
                    <h1 className="text-4xl font-bold">Leaves</h1>
                </div>
                
                {/* Content Section */}
                <div className="flex-1 flex flex-col">
                    {/* Top Section: Create Leave Form */}
                    <div className="mb-8 border-4 border-black rounded-2xl">
                        <div className="text-3xl w-full text-center mt-4 font-bold mb-4">Create Leave</div>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full text-center space-y-4">
                            <div className="flex justify-around space-x-8">
                                <div>
                                    <label htmlFor="start_date" className="block font-semibold">From</label>
                                    <input
                                        type="date"
                                        id="start_date"
                                        {...register('start_date', { required: true })}
                                        className="border-2 border-black rounded p-2 w-full"
                                    />
                                    {errors.start_date && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div>
                                    <label htmlFor="end_date" className="block font-semibold">To</label>
                                    <input
                                        type="date"
                                        id="end_date"
                                        {...register('end_date', { required: true })}
                                        className="border-2 border-black rounded p-2 w-full"
                                    />
                                    {errors.end_date && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div>
                                    <label htmlFor="reason" className="block font-semibold">Reason</label>
                                    <textarea
                                        id="reason"
                                        {...register('reason', { required: true })}
                                        className="border-2 border-black rounded p-2 w-full"
                                    />
                                    {errors.reason && <span className="text-red-600">This field is required</span>}
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="mb-4
                                py-2 px-4 bg-black text-yellow rounded hover:bg-yellow hover:text-black transition duration-300">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Bottom Section: Previous Leaves */}
                    <div className="flex flex-col">
                        <div className="text-3xl font-bold mb-4">Previous Leaves</div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-2 border-black">
                                <thead>
                                    <tr className="bg-yellow">
                                        <th className="border-2 border-black px-4 py-2">Leave ID</th>
                                        <th className="border-2 border-black px-4 py-2">From</th>
                                        <th className="border-2 border-black px-4 py-2">To</th>
                                        <th className="border-2 border-black px-4 py-2">Reason</th>
                                        <th className="border-2 border-black px-4 py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaves && leaves.map((leave) => (
                                        <tr key={leave.leave_id} className={
                                            leave.leave_status === "Pending" ? "bg-gray" :
                                            leave.leave_status === "Accepted" ? "bg-green" :
                                            "bg-red"
                                        }>
                                            <td className="border-2 border-black px-4 py-2">{leave.leave_id}</td>
                                            <td className="border-2 border-black px-4 py-2">{leave.from}</td>
                                            <td className="border-2 border-black px-4 py-2">{leave.to}</td>
                                            <td className="border-2 border-black px-4 py-2">{leave.reason}</td>
                                            <td className="border-2 border-black px-4 py-2">{leave.leave_status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeLeaves;