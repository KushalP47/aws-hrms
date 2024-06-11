import React, { useState, useEffect } from 'react';
import illustration from '../../assets/buildings.svg'; 
import EmployeeNavbar from '../../components/EmployeeNavbar.jsx';
import { useSelector } from 'react-redux';
import taskService from '../../services/taskService';


const EmployeeTasks = () => {
    const illustrationSrc = illustration; 
    const [tasks, setTasks] = useState([]);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await taskService.getTasksList({token});
            const taskList = data.filter(task => task.toId === userId);
            setTasks(taskList);
        };
        fetchTasks();
    }, []);
    return (
        <div className="flex min-h-screen">
            {/* Navbar */}
            <EmployeeNavbar current="Tasks"/>

            {/* Right Section */}
            <div className="bg-white w-4/5 border-4 border-yellow shadow-xl flex flex-col p-8">
                {/* Title Section */}
                <div className="flex justify-start mb-8">
                    <h1 className="text-4xl font-bold">Tasks</h1>
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

export default EmployeeTasks;
