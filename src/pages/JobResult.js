import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobMbti from '../common/api/jobResult.json';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/TotalResult.css';
import Footer from './Footer';
import MainHeader from './Header';
import KakaoShareButton from './KakaoShareButton';

import JobReview from './JobReview';
import { SERVER } from '../lib/constant';
function JobResult() {
    const location = useLocation();
    const mbti = location.state.id;
    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const goReview = () => {
        openPopup();
    };

    const goChat = () => {
        navigate('/ChatLogin');
    };

    useEffect(() => {
        // function for sending data
        const sendData = async () => {
            const result = JobMbti.find((data) => data.id === mbti.mbti)?.text || '';
            const test_name = '직업Test'; // test name to send
            const user_id = sessionStorage.getItem('user_data'); // User ID stored in session

            try {
                await axios.post(`${SERVER}/participation`, {
                    user_id,
                    result,
                    test_name,
                });
            } catch (error) {
                console.error('Failed to send data:', error);
            }
        };

        if (mbti.mbti) {
            sendData();
        }
    }, []); // 의존성 배열 비워둠

    return (
        <>
            <div className="Layout">
                <MainHeader />
                <div className="resultLayout">
                    <div className="resultTitle">
                        <h2 className="title1">
                            {' '}
                            <img src="image/job.png" alt="job" className="titleImg" /> 직업 MBTI 결과는?
                        </h2>
                    </div>
                    {JobMbti.map((data) => {
                        if (data.id === mbti.mbti) {
                            return (
                                <div className="resultShow" key={data.id}>
                                    <p className="mbti">-{data.id}-</p>
                                    <p className="jobN">{data.nickname}</p>

                                    <img src={data.img} alt="mbti" width={'350px'} height={'350px'} className="img" />
                                    <ul className="description">
                                        <li className="exp">{data.description[0].exp}</li>
                                        <li className="exp">{data.description[1].exp}</li>
                                        <li className="exp">{data.description[2].exp}</li>
                                        <li className="exp">{data.description[3].exp}</li>
                                    </ul>
                                    <h1 className="travelTitle">
                                        {' '}
                                        <img src="image/job-search.png" alt="job" className="rImg" /> 추천하는 직업은?
                                    </h1>
                                    <div className="recommend">
                                        <img src={data.img1} alt="kk" className="jobImg" />
                                        <img src={data.img2} alt="kk" className="jobImg" />
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                    <div className="buttonLayout">
                        <div className="buttonBox">
                            <KakaoShareButton />
                            <button type="button" className="review btn" onClick={goReview}>
                                리뷰쓰기 <img src="image/feedback.png" alt="" width={'23px'} height={'23px'} />
                            </button>
                            <button type="button" className="chat btn" onClick={goChat}>
                                채팅하기 <img src="image/chat.png" alt="" width={'20px'} height={'20px'} />
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <JobReview onClose={closePopup} />
                    </div>
                </div>
            )}
        </>
    );
}

export default JobResult;
