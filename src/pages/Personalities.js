import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardContent, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MainHeader from './Header';

const customTheme = createTheme({
    typography: {
        fontFamily: 'Noto Sans KR, sans-serif',
        h5: {
            fontSize: '40px',
            fontWeight: 'bold',
            color: '#333',
        },
    },
    palette: {
        primary: {
            main: '#42a5f5',
        },
    },
});
const Title = styled.h1`
    padding: 20px;
    font-size: 50px;
    text-align: center;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background: #fff;
    padding: 20px;
    max-width: 600px;
    width: 90%;
`;

const ModalTitle = styled.h2`
    font-size: 40px;
    margin-bottom: 10px;
    text-align: center;
`;

const ModalDescription = styled.p`
    font-size: 18px;
    margin-bottom: 40px;
`;

const CloseButton = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #999;
    }
`;

const CardWrapper = styled.div`
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;
const CardImage = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
`;
const Personalities = () => {
    const sliderRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({ type_id: '', img: '', content: '' });

    const next = () => {
        sliderRef.current.slickNext();
    };

    const previous = () => {
        sliderRef.current.slickPrev();
    };

    const openModal = (type_id, img, content) => {
        setSelectedCard({ type_id, img, content });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const cardData = [
        {
            type_id: 'ENFP',
            img: 'mbti/enfp.png',
            content:
                '정열적이고 활기가 넘치며 상상력이 풍부하다. 온정적이고 창의적이며 항상 새로운 가능성을 찾고 시도하는 유형이다. 문제 해결에 재빠르고 관심이 있는 일은 수행해내는 능력과 열성이 있다. 반복되는 일상적인 일을 참지 못하고 열성이 나지 않는다. 또한 한 가지 일을 끝내기도 전에 몇 가지 다른 일을 또 벌이는 경향을 가지고 있다. 통찰력과 창의력이 요구되지 않는 일에는 흥미를 느끼지 못하고 열성을 불러일으키지 못한다',
        },
        {
            type_id: 'INFP',
            img: 'mbti/infp.png',
            content:
                '인간 본연에 대한 애정으로 사람들의 장점을 발견하고, 이들의 가능성을 성취할 수 있도록 도우며, 세상을 더 나은 곳으로 만든다. 하지만 대그룹에 있을 경우 그들의 에너지가 쉽게 고갈되는 경향이 있고, 그들이 엄선한 친밀도가 높은 소수의 사람들과 상호작용 하는 것을 선호한다. 혼자 있기를 좋아하는 개인적인 성향도 있지만, 수줍음과 혼동되어서는 안되며 혼자 시간을 보내는 것으로부터 에너지를 얻는다',
        },
        {
            type_id: 'ESFJ',
            img: 'mbti/esfj.png',
            content:
                '현실적이며 리더십이 있는 ESTJ 유형의 사람들은 연인에게 책임감 있고 헌신적인 타입이며 연인에게도 책임감을 요구한다. 데이트를 할 때도 계획적으로 움직이며 안정적인 연애를 선호하는 편이기에 ESTJ와는 결혼까지 이어질 확률이 높으며, 혼인 후 안정적인 배우자가 될 가능성이 높다.',
        },
        {
            type_id: 'ISFJ',
            img: 'mbti/isfj.png',
            content: '매우 독립적인 성격으로 다른 사람의 기대를 따르기보다는 자신만의 아이디어를 추구',
        },
        {
            type_id: 'ISFP',
            img: 'mbti/isfp.png',
            content: '동행 중에서 리더 격으로 여행을 이끌며 동행에게 알맞은 역할을 부여, 효율적인 여행을 이끌어냄',
        },
        {
            type_id: 'ESFP',
            img: 'mbti/esfp.png',
            content: '동행 중에서 리더 격으로 여행을 이끌며 동행에게 알맞은 역할을 부여, 효율적인 여행을 이끌어냄',
        },
        {
            type_id: 'INTP',
            img: 'mbti/intp.png',
            content: '동행 중에서 리더 격으로 여행을 이끌며 동행에게 알맞은 역할을 부여, 효율적인 여행을 이끌어냄',
        },
        {
            type_id: 'INFJ',
            img: 'mbti/infj.png',
            content: '동행 중에서 리더 격으로 여행을 이끌며 동행에게 알맞은 역할을 부여, 효율적인 여행을 이끌어냄',
        },
        {
            type_id: 'ENFJ',
            img: 'mbti/enfj.png',
            content: '동행 중에서 리더 격으로 여행을 이끌며 동행에게 알맞은 역할을 부여, 효율적인 여행을 이끌어냄',
        },
        {
            type_id: 'ENTP',
            img: 'mbti/entp.png',
            content: '동행 중에서 리더 격으로 여행을 이끌며 동행에게 알맞은 역할을 부여, 효율적인 여행을 이끌어냄',
        },
        {
            type_id: 'ESTJ',
            img: 'mbti/estj.png',
            content: '동행 중에서 리더 격으로 여행을 이끌며 동행에게 알맞은 역할을 부여, 효율적인 여행을 이끌어냄',
        },
        {
            type_id: 'ISTJ',
            img: 'mbti/istj.png',
            content: '동행 중에서 리더 격으로 여행을 이끌며 동행에게 알맞은 역할을 부여, 효율적인 여행을 이끌어냄',
        },
        {
            type_id: 'INTJ',
            img: 'mbti/intj.png',
            content: '동행 중에서 리더 격으로 여행을 이끌며 동행에게 알맞은 역할을 부여, 효율적인 여행을 이끌어냄',
        },
        {
            type_id: 'ISTP',
            img: 'mbti/istp.png',
            content: '동행 중에서 리더 격으로 여행을 이끌며 동행에게 알맞은 역할을 부여, 효율적인 여행을 이끌어냄',
        },
        {
            type_id: 'ESTP',
            img: 'mbti/estp.png',
            content: '동행 중에서 리더 격으로 여행을 이끌며 동행에게 알맞은 역할을 부여, 효율적인 여행을 이끌어냄',
        },
        {
            type_id: 'ENTJ',
            img: 'mbti/entj.png',
            content: '동행 중에서 리더 격으로 여행을 이끌며 동행에게 알맞은 역할을 부여, 효율적인 여행을 이끌어냄',
        },
    ];
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <MainHeader />
            <ThemeProvider theme={customTheme}>
                <Title>MBTI 유형</Title>
                <div style={{ margin: '100px auto' }}>
                    <div style={{ padding: '0px 40px' }}>
                        <Slider ref={sliderRef} {...settings}>
                            {cardData.map((data) => (
                                <CardWrapper
                                    key={data.type_id}
                                    onClick={() => openModal(data.type_id, data.img, data.content)}
                                >
                                    <Card sx={{ mr: 2, minHeight: 400 }}>
                                        <CardContent>
                                            <Typography
                                                variant="h5"
                                                component="h2"
                                                style={{ marginBottom: '10px', textAlign: 'center' }}
                                            >
                                                {data.type_id}
                                            </Typography>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    marginBottom: '20px',
                                                }}
                                            >
                                                <img
                                                    src={data.img}
                                                    alt={data.type_id}
                                                    style={{ width: '80%', height: 'auto', objectFit: 'cover' }}
                                                />
                                            </div>
                                            {/* <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center' }}>
                                            {data.content}
                                        </Typography> */}
                                        </CardContent>
                                    </Card>
                                </CardWrapper>
                            ))}
                        </Slider>
                    </div>
                </div>
                {modalOpen && (
                    <ModalOverlay>
                        <ModalContent>
                            <ModalTitle>{selectedCard.type_id}</ModalTitle>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                <img
                                    src={selectedCard.img}
                                    alt={selectedCard.type_id}
                                    style={{ width: '80%', height: 'auto', objectFit: 'cover' }}
                                />
                            </div>
                            <ModalDescription>{selectedCard.content}</ModalDescription>
                            <CloseButton variant="outlined" color="primary" onClick={closeModal}>
                                Close
                            </CloseButton>
                        </ModalContent>
                    </ModalOverlay>
                )}
            </ThemeProvider>
        </>
    );
};

export default Personalities;
