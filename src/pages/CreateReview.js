import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateReview.scss';

function CreateReview({ mbtiResult, onClose }) {
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
    //세션 스토리지에 유저 아이디 가져오기
    const userId = sessionStorage.getItem('user_data');
    const test_name = '여행Test';

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            content: reviewData.content,
            result: mbtiResult,
            userId: userId,
            test_name,
        };

        try {
            // send data to API
            const response = await axios.post(`http://localhost:8000/review`, dataToSend);
            console.log('Review was successful:', response.data);
            // Add MBTI test results and User_id to review data

            // Close the popup
            onClose();
        } catch (error) {
            console.error('Failed to write review:', error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <div className="popup-nav">
                    <h3>리뷰 작성하기</h3>
                    <button className="close-button" onClick={handleClose}>
                        X
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea name="content" value={reviewData.content} onChange={handleChange} placeholder="내용" />
                    <button type="submit">리뷰 작성</button>
                </form>
            </div>
        </div>
    );
}

export default CreateReview;
