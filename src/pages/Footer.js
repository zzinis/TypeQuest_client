import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Footer() {
    const thisYear = () => {
        const year = new Date().getFullYear();
        return year;
    };

    const navigate = useNavigate();

    const listClick = () => {
        navigate('/List');
    };

    const testClick = () => {
        navigate('/Test');
    };

    const reviewClick = () => {
        navigate('/Review');
    };

    const chatClick = () => {
        navigate('/ChatLogin');
    };

    const developerClick = () => {
        navigate('/Developer');
    };

    const askCheck = () => {
        navigate('/Ask');
    };

    useEffect(() => {
        const addAdvertisement = () => {
            let ins = document.createElement('ins');
            let scr = document.createElement('script');

            ins.className = 'kakao_ad_area';
            ins.style.display = 'none';
            ins.style.width = '100%';
            scr.async = true;
            scr.type = 'text/javascript';
            scr.src = '//t1.daumcdn.net/kas/static/ba.min.js';

            ins.setAttribute('data-ad-width', '728');
            ins.setAttribute('data-ad-height', '90');
            ins.setAttribute('data-ad-unit', 'DAN-uz3S6UQZk8mGBpZf');

            const adfit = document.querySelector('.adfit');
            if (adfit) {
                adfit.appendChild(ins);
                adfit.appendChild(scr);
            }
        };

        addAdvertisement();

        return () => {
            const adfit = document.querySelector('.adfit');
            if (adfit) {
                while (adfit.firstChild) {
                    adfit.removeChild(adfit.firstChild);
                }
            }
        };
    }, []);

    return (
        <div id="main-footer">
            <Row>
                <div>질문이 있으신가요? 문의: 000-123-4567</div>
                <div className="adfit"></div>
                <ul className="ul-container">
                    <li className="footer-li" onClick={listClick}>
                        <div>성격 유형</div>
                    </li>
                    <li className="footer-li" onClick={testClick}>
                        <div> 테스트</div>
                    </li>
                    <li className="footer-li" onClick={reviewClick}>
                        <div>리뷰</div>
                    </li>
                </ul>
                <ul className="ul-container">
                    <li className="footer-li" onClick={chatClick}>
                        <div>채팅</div>
                    </li>
                    <li className="footer-li" onClick={developerClick}>
                        <div>개발자</div>
                    </li>
                    <li className="footer-li" onClick={askCheck}>
                        <div>문의</div>
                    </li>
                </ul>
                <br />
                <div className="footer">
                    ⓒ <span>{thisYear()} TypeQuest</span>
                </div>
            </Row>
        </div>
    );
}

export default Footer;
