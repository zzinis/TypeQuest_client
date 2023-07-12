import React, { useEffect } from 'react';
const KakaoShareButton = () => {
    window.Kakao.init('dbc26ec5c63bf136447323baac97f826');
    useEffect(() => {
        // 사용할 앱의 JavaScript 키를 입력하세요.

        window.Kakao.Share.createDefaultButton({
            container: '#kakaotalk-sharing-btn',
            objectType: 'feed',
            content: {
                title: 'TypeQuest',
                description: '#MBTI #여행지 #유튜브 #직업 #선택장애',
                imageUrl: 'https://daeyo.s3.ap-northeast-2.amazonaws.com/mainImg.png',
                link: {
                    mobileWebUrl: 'https://web-typequest-20zynm2mljxnpenj.sel4.cloudtype.app',
                    webUrl: 'https://web-typequest-20zynm2mljxnpenj.sel4.cloudtype.app',
                },
            },
            social: {
                likeCount: 286,
                commentCount: 45,
                sharedCount: 845,
            },
            buttons: [
                {
                    title: '웹으로 보기',
                    link: {
                        mobileWebUrl: 'https://web-typequest-20zynm2mljxnpenj.sel4.cloudtype.app',
                        webUrl: 'https://web-typequest-20zynm2mljxnpenj.sel4.cloudtype.app',
                    },
                },
                {
                    title: '앱으로 보기',
                    link: {
                        mobileWebUrl: 'https://web-typequest-20zynm2mljxnpenj.sel4.cloudtype.app',
                        webUrl: 'https://web-typequest-20zynm2mljxnpenj.sel4.cloudtype.app',
                    },
                },
            ],
        });
    }, []);

    return (
        <a id="kakaotalk-sharing-btn" href="https://web-typequest-20zynm2mljxnpenj.sel4.cloudtype.app/">
            <img
                src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                alt="KakaoTalk share send button"
            />
        </a>
    );
};

export default KakaoShareButton;
