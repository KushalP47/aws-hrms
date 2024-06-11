import React, { useEffect, useState } from 'react';
import illustration from '../../assets/buildings.svg'; 
import EmployeeNavbar from '../../components/EmployeeNavbar.jsx';
import logo from '../../assets/Group.svg'; 
import { useSelector } from 'react-redux';
import feedbackService from '../../services/feedbackService';

const EmployeeFeedback = () => {
    const logoSrc = logo;
    const illustrationSrc = illustration; 
    const [feedback, setFeedback] = useState([]); 
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);
    const [rating, setRating] = useState(0);


    useEffect(() => {
        const fetchFeedback = async () => {
            const feedbackList = await feedbackService.getFeedbackList({token});
            const userFeedback = feedbackList.filter(feedback => feedback.toId === userId);
            const tempRating = 0;
            for ( let i = 0; i < userFeedback.length; i++ ) {
                tempRating += userFeedback[i].rating;
            }
            if (userFeedback.length > 0) {
                tempRating = tempRating / userFeedback.length;
            }
            setRating(tempRating);
            setFeedback(userFeedback);
        };
        fetchFeedback();
    }, []);

    return (
        <div className="flex min-h-screen">
            {/* Navbar */}
            <EmployeeNavbar current="Feedback"/>

            {/* Right Section */}
            <div className="bg-white w-4/5 border-4 border-yellow shadow-xl flex flex-col p-8">
                {/* Title Section */}
                <div className="flex justify-start mb-8">
                    <h1 className="text-4xl font-bold">Feedback</h1>
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

export default EmployeeFeedback;
