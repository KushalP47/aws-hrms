import React, { useEffect, useState } from 'react';
import illustration from '../../assets/buildings.svg'; 
import EmployeeNavbar from '../../components/EmployeeNavbar.jsx';
import { useSelector } from 'react-redux';
import feedbackService from '../../aws/feedback.js';

const EmployeeFeedback = () => {
    const illustrationSrc = illustration; 
    const [feedback, setFeedback] = useState([]); 
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchFeedback = async () => {
            const feedbackList = await feedbackService.getFeedbackList({ token });
            const userFeedback = feedbackList.filter(feedback => feedback.toId === userId);
            let tempRating = 0;
            for (let i = 0; i < userFeedback.length; i++) {
                tempRating += userFeedback[i].rating;
            }
            if (userFeedback.length > 0) {
                tempRating = tempRating / userFeedback.length;
            }
            setRating(tempRating);
            setFeedback(userFeedback);
        };
        fetchFeedback();
    }, [token, userId]);

    return (
        <div className="flex min-h-screen">
            {/* Navbar */}
            <EmployeeNavbar current="Feedback" />

            {/* Right Section */}
            <div className="bg-white w-4/5 border-4 border-yellow shadow-xl flex flex-col p-8">
                {/* Title Section */}
                <div className="flex justify-start mb-8">
                    <h1 className="text-4xl font-bold">Feedback</h1>
                </div>
                
                {/* Content Section */}
                <div className="flex flex-col space-y-8">
                    {/* Average Rating Section */}
                    <div className="text-2xl font-bold text-center">
                        Average Rating: {rating.toFixed(2)}
                    </div>

                    {/* Feedback Cards Section */}
                    <div className="flex flex-wrap -mx-4">
                        {feedback.map((fb, index) => (
                            <div key={index} className="w-1/2 px-4 py-2">
                                <div className="border-4 border-black rounded-lg p-4 bg-yellow h-full">
                                    <div className="mb-2 font-semibold">Date: {new Date(fb.date).toLocaleDateString()}</div>
                                    <div className="mb-2 font-semibold">From: {fb.fromName}</div>
                                    <div className="mb-2 font-semibold">Rating: {fb.rating}</div>
                                    <div className="font-semibold">Feedback: {fb.feedback}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeFeedback;
