import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Footer() {
    const thisYear = () => {
        const year = new Date().getFullYear();
        return year;
    };

    const navigate = useNavigate();

    const listClick = () => {
        // 로고를 클릭하면 메인 페이지로 이동합니다.
        navigate('/List');
    };

    const testClick = () => {
        // 각 링크를 클릭하면 해당 페이지로 이동합니다.
        navigate('/Test');
    };

    const reviewClick = () => {
        // 각 링크를 클릭하면 해당 페이지로 이동합니다.
        navigate('/Review');
    };

    const chatClick = () => {
        // 각 링크를 클릭하면 해당 페이지로 이동합니다.
        navigate('/ChatLogin');
    };

    const developerClick = () => {
        // 각 링크를 클릭하면 해당 페이지로 이동합니다.
        navigate('/Developer');
    };

    const askCheck = () => {
        // 각 링크를 클릭하면 해당 페이지로 이동합니다.
        navigate('/Ask');
    };

    return (
        <div id="main-footer">
            <Row>
                <div>질문이 있으신가요? 문의: 000-123-4567</div>
                <br />
                <br />
                <ul className="ul-container">
                    <li className="footer-li" onClick={listClick}>
                        <div>성격 유형</div>
                    </li>
                    <li className="footer-li">
                        <div className="li-container" onClick={testClick}>
                            테스트
                        </div>
                    </li>
                    <li className="footer-li">
                        <div onClick={reviewClick}>리뷰</div>
                    </li>
                    <li className="footer-li">
                        <div className="li-container" onClick={chatClick}>
                            채팅
                        </div>
                    </li>
                    <li className="footer-li">
                        <div onClick={developerClick}>개발자</div>
                    </li>
                    <li className="footer-li">
                        <div className="li-container" onClick={askCheck}>
                            문의
                        </div>
                    </li>
                </ul>
                <br />
                <div className="footer">
                    저작권 © <span>{thisYear()} - TypeQuest 제작</span>
                </div>
            </Row>
        </div>
    );
}

export default Footer;
