import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateReview.scss';

function CreateReview({ mbtiResult, userId, onClose }) {
    const [reviewData, setReviewData] = useState({
        title: '',
        content: '',
    });

    const handleChange = (e) => {
        setReviewData({
            ...reviewData,
            [e.target.name]: e.target.value,
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         // Add MBTI test results and User_id to review data
    //         const dataToSend = {
    //             ...reviewData,
    //             mbtiResult,
    //             userId,
    //             // testId: '1',
    //             img: '',
    //         };

    //         // send data to API
    //         // const response = await axios.post(`https://localhost:8000/review/${userId}/${testId}`, dataToSend);
    //         console.log('Review was successful:', response.data);

    //         // Perform necessary operations after completing review writing
    //         // Example: page reloading, route navigation, etc.

    //         // Close the popup
    //         onClose();
    //     } catch (error) {
    //         console.error('Failed to write review:', error);
    //     }
    // };

    // const handleClose = () => {
    //     onClose();
    // };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <div className="popup-nav">
                    <h3>리뷰 작성하기</h3>
                    {/* <button className="close-button" onClick={handleClose}> */}X{/* </button> */}
                </div>
                <form>
                    {/* <form onSubmit={handleSubmit}> */}

                    <input
                        type="text"
                        name="title"
                        value={reviewData.title}
                        onChange={handleChange}
                        placeholder="제목"
                    />
                    <textarea name="content" value={reviewData.content} onChange={handleChange} placeholder="내용" />
                    <button type="submit">리뷰 작성</button>
                </form>
            </div>
        </div>
    );
}

export default CreateReview;
