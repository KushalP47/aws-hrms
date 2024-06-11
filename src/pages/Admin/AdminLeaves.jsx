import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Group.svg';
import { useSelector } from 'react-redux';
import leavesService from '../../aws/leaves.js';
import AdminNavbar from '../../components/Navbar.jsx';
const AdminLeaves = () => {
    const logoSrc = logo;
    const token = useSelector(state => state.auth.token);
    const [pendingLeaves, setPendingLeaves] = useState([]);
    const [resolvedLeaves, setResolvedLeaves] = useState([]);
    const [leaveUpdated, setLeaveUpdated] = useState(0);

    const fetchLeaves = async () => {
        try {
            const data = await leavesService.getLeaveList({ token });
            const pending = data.filter(leave => leave.leave_status === "Pending");
            const resolved = data.filter(leave => leave.leave_status !== "Pending");
            setPendingLeaves(pending);
            setResolvedLeaves(resolved);
        } catch (error) {
            console.log(error);
        }
    };

    const updateLeaveStatus = async (leave_id, status) => {
        try {
            const leave = pendingLeaves.find(leave => leave.leave_id === leave_id);
            if (leave) {
                leave.leave_status = status;
                console.log(leave);
                await leavesService.updateLeave({ token, body: leave });
                setLeaveUpdated(leaveUpdated + 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, [leaveUpdated]);

    return (
        <div className="flex min-h-screen">
            {/* Navbar */}
            <AdminNavbar current="Leaves"/>

            {/* Right Section */}
            <div className="bg-white w-4/5 border-4 border-yellow shadow-xl flex flex-col p-8">
                {/* Title Section */}
                <div className="flex justify-start mb-8">
                    <h1 className="text-4xl font-bold">Leaves Management</h1>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col space-y-8">
                    {/* Pending Leaves Table */}
                    <div>
                        <div className="text-3xl font-bold mb-4">Pending Requests</div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-2 border-black">
                                <thead>
                                    <tr className="bg-yellow">
                                        <th className="border-2 border-black px-4 py-2">Leave ID</th>
                                        <th className="border-2 border-black px-4 py-2">Name</th>
                                        <th className="border-2 border-black px-4 py-2">From</th>
                                        <th className="border-2 border-black px-4 py-2">To</th>
                                        <th className="border-2 border-black px-4 py-2">Reason</th>
                                        <th className="border-2 border-black px-4 py-2">Status</th>
                                        <th className="border-2 border-black px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingLeaves.map((leave) => (
                                        <tr key={leave.leave_id} className="bg-gray-300">
                                            <td className="border-2 border-black px-4 py-2">{leave.leave_id}</td>
                                            <td className="border-2 border-black px-4 py-2">{leave.name}</td>
                                            <td className="border-2 border-black px-4 py-2">{leave.from}</td>
                                            <td className="border-2 border-black px-4 py-2">{leave.to}</td>
                                            <td className="border-2 border-black px-4 py-2">{leave.reason}</td>
                                            <td className="border-2 border-black px-4 py-2">{leave.leave_status}</td>
                                            <td className="border-2 border-black px-4 py-2">
                                                <button
                                                    onClick={() => updateLeaveStatus(leave.leave_id, "Accepted")}
                                                    className="mr-2 py-1 px-3 bg-green-dark text-white rounded hover:bg-black transition duration-300"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => updateLeaveStatus(leave.leave_id, "Rejected")}
                                                    className="py-1 px-3 bg-red-dark text-white rounded hover:bg-black transition duration-300"
                                                >
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Resolved Leaves Table */}
                    <div>
                        <div className="text-3xl font-bold mb-4">Resolved Requests</div>
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
                                    {resolvedLeaves.map((leave) => (
                                        <tr key={leave.leave_id} className={
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

export default AdminLeaves;
