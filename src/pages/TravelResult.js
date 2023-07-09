import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Mbti from '../common/api/travelResult.json';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/TravelResult.scss';

import CreateReview from './CreateReview';

function TravelResult() {
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
        navigate('/Chat');
    };

    useEffect(() => {
        // 데이터 전송을 위한 함수
        const sendData = async () => {
            const result = Mbti.find((data) => data.id === mbti.mbti)?.text || '';
            const test_name = '여행Test'; // 전송할 테스트명
            const user_id = sessionStorage.getItem('user_id'); // 세션에 저장된 사용자 ID

            try {
                await axios.post('http://localhost:8000/participation', { user_id, result, test_name });
                console.log('데이터 전송 완료', { user_id, result, test_name });
            } catch (error) {
                console.error('데이터 전송 실패:', error);
            }
        };
        sendData();
    }, []);

    return (
        <>
            <div className="Layout">
                <div className="resultLayout">
                    <div className="resultTitle">
                        <h2>님의 여행MBTI 결과는?</h2>
                    </div>
                    {Mbti.map((data) => {
                        return (
                            <>
                                {data.id === mbti.mbti && (
                                    <div className="resultShow">
                                        <p className="resultMain">{data.id}</p>
                                        <p className="resultMain">{data.nickname}</p>

                                        <img
                                            src={data.img}
                                            alt="mbti"
                                            width={'350px'}
                                            height={'350px'}
                                            className="img"
                                        />
                                        <ul className="description">
                                            <li className="exp">{data.description[0].exp}</li>
                                            <li className="exp">{data.description[1].exp}</li>
                                            <li className="exp">{data.description[2].exp}</li>
                                        </ul>
                                        <h1 className="travelTitle">추천하는 여행지는?</h1>
                                        <div className="recommend">
                                            <h2>{data.text}</h2>

                                            <img src={data.rec_img} alt="kk" className="rec_img" />
                                        </div>
                                    </div>
                                )}
                            </>
                        );
                    })}
                    <div className="buttonLayout">
                        <div className="buttonBox">
                            <button type="button" className="share btn">
                                공유하기 <img src="image/share.png" alt="" width={'20px'} height={'20px'} />
                            </button>
                            <button type="button" className="review btn" onClick={goReview}>
                                리뷰쓰기 <img src="image/feedback.png" alt="" width={'23px'} height={'23px'} />
                            </button>
                            <button type="button" className="chat btn" onClick={goChat}>
                                채팅하기 <img src="image/chat.png" alt="" width={'20px'} height={'20px'} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <CreateReview onClose={closePopup} />
                    </div>
                </div>
            )}
        </>
    );
}

export default TravelResult;
