import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Footer() {
    const thisYear = () => {
        const year = new Date().getFullYear();
        return year;
    };

    const [apiRequestCount, setApiRequestCount] = useState(0);
    const [lastApiRequestTime, setLastApiRequestTime] = useState(null);
    const makeApiRequest = () => {
        const currentTime = new Date().getTime();

        if (lastApiRequestTime === null || currentTime - lastApiRequestTime >= 60000) {
            setApiRequestCount(apiRequestCount + 1);
            setLastApiRequestTime(currentTime);
        }
    };

    const navigate = useNavigate();
    const isMobileSize = window.innerWidth <= 768;
    const listClick = () => {
        navigate('/List');
    };

    const testClick = () => {
        navigate('/MbtiPage');
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
        makeApiRequest();
    }, []);
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
            ins.setAttribute('data-ad-unit', 'DAN-Steo8rTmnFYC5GzA');

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

    useEffect(() => {
        const mobile_kakaoAdfit = () => {
            let ins = document.createElement('ins');
            let scr = document.createElement('script');

            ins.className = 'kakao_ad_area';
            ins.style.display = 'none';
            scr.async = true;
            scr.type = 'text/javascript';
            scr.src = '//t1.daumcdn.net/kas/static/ba.min.js';

            ins.setAttribute('data-ad-width', '320');
            ins.setAttribute('data-ad-height', '50');
            ins.setAttribute('data-ad-unit', 'DAN-Jbd61kYRTC0lKHdz');

            const mobile_adfit = document.querySelector('.mobile_adfit');
            if (mobile_adfit) {
                mobile_adfit.appendChild(ins);
                mobile_adfit.appendChild(scr);
            }
        };

        mobile_kakaoAdfit();

        return () => {
            const mobile_adfit = document.querySelector('.mobile_adfit');
            if (mobile_adfit) {
                while (mobile_adfit.firstChild) {
                    mobile_adfit.removeChild(mobile_adfit.firstChild);
                }
            }
        };
    }, []);

    return (
        <div id="main-footer">
            <Row>
                <div>질문이 있으신가요? 문의: 000-123-4567</div>
                <div className="adfit"></div>
                {isMobileSize ? <div className="mobile_adfit"></div> : null}
                <ul className="ul-container">
                    <li className="footer-li" onClick={listClick}>
                        <div>성격 유형</div>
                    </li>
                    <li className="footer-li" onClick={testClick}>
                        <div>테스트</div>
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
