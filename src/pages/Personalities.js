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
    width: 100%;

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
    const [selectedCard, setSelectedCard] = useState({
        type_id: '',
        img: '',
        content1: '',
        content2: '',
        content3: '',
    });

    const next = () => {
        sliderRef.current.slickNext();
    };

    const previous = () => {
        sliderRef.current.slickPrev();
    };

    const openModal = (type_id, img, content1, content2, content3) => {
        setSelectedCard({ type_id, img, content1, content2, content3 });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const cardData = [
        {
            type_id: 'ENFP',
            img: 'mbti/enfp.png',
            content1: '정열적이고 열정적인 성격',
            content2: '상상력과 창의력이 풍부하며 새로운 가능성을 탐구함',
            content3: '타인에게 긍정적인 영감을 줄 수 있음',
        },
        {
            type_id: 'INFP',
            img: 'mbti/infp.png',
            content1: '이상적이고 이해심 많은 성격',
            content2: '감성적이며 창의적인 면이 있음',
            content3: '자기 신념과 가치를 중시하고 추구함',
        },
        {
            type_id: 'ESFJ',
            img: 'mbti/esfj.png',
            content1: '사교적이고 친절한 성격',
            content2: '다른 사람들에게 도움을 주는 데 관심이 많음',
            content3: '조화와 안정을 중요시함',
        },
        {
            type_id: 'ISFJ',
            img: 'mbti/isfj.png',
            content1: '책임감이 강하고 협조적인 성격',
            content2: '타인의 감정을 잘 이해하고 돌봄의 역할을 선호',
            content3: '신뢰성과 충실성을 중요시함',
        },
        {
            type_id: 'ISFP',
            img: 'mbti/isfp.png',
            content1: '예술적이고 감각적인 성격',
            content2: '자유로운 영혼으로서 자기 정체성을 중요시함',
            content3: '타인에게 온정과 배려를 베풀어 줌',
        },
        {
            type_id: 'ESFP',
            img: 'mbti/esfp.png',
            content1: '사교적이고 외향적인 성격',
            content2: '즉흥적이며 다양한 경험과 새로운 것에 열려 있음',
            content3: '타인에게 즐거움을 주는 능력이 있음',
        },
        {
            type_id: 'INTP',
            img: 'mbti/intp.png',
            content1: '분석적이고 논리적인 사고 방식',
            content2: '호기심이 많고 지적인 욕구가 강함',
            content3: '새로운 아이디어와 개념을 탐구함',
        },
        {
            type_id: 'INFJ',
            img: 'mbti/infj.png',
            content1: '비전을 가지고 목표를 추구하는 성격',
            content2: '타인의 감정을 민감하게 인지하고 돌봄의 역할을 수행함',
            content3: '심층적인 이해와 동료애를 중요시함',
        },
        {
            type_id: 'ENFJ',
            img: 'mbti/enfj.png',
            content1: '친절하고 동정심이 많은 성격',
            content2: '타인의 감정을 잘 이해하고 돌봄의 역할을 선호함',
            content3: '타인과 협력하여 목표를 달성하는 능력이 있음',
        },
        {
            type_id: 'ENTP',
            img: 'mbti/entp.png',
            content1: '명석하고 독창적인 사고 방식',
            content2: '논쟁과 토론을 즐기며 새로운 아이디어를 탐색함',
            content3: '도전과 변화를 추구하는 성향',
        },
        {
            type_id: 'ESTJ',
            img: 'mbti/estj.png',
            content1: '현실적이고 현실감각이 뛰어난 성격',
            content2: '조직적이고 책임감 있게 업무를 수행함',
            content3: '논리적인 사고와 결정을 선호함',
        },
        {
            type_id: 'ISTJ',
            img: 'mbti/istj.png',
            content1: '신중하고 조용한 성격',
            content2: '현실적이고 실용적인 사고 방식',
            content3: '계획을 세우고 목표를 추구하는 경향',
        },
        {
            type_id: 'INTJ',
            img: 'mbti/intj.png',
            content1: '전략적이고 분석적인 사고 방식',
            content2: '목표 달성과 성과 중심적인 성격',
            content3: '독립적이고 신중한 결정을 내림',
        },
        {
            type_id: 'ISTP',
            img: 'mbti/istp.png',
            content1: '조용하고 관찰력이 뛰어난 성격',
            content2: '문제 해결과 기술적인 역할에 능숙함',
            content3: '현재 상황에 대한 실질적인 대응력을 보임',
        },
        {
            type_id: 'ESTP',
            img: 'mbti/estp.png',
            content1: '행동력과 대처능력이 뛰어난 성격',
            content2: '현재의 경험과 활동에 집중함',
            content3: '위험을 감수하며 도전을 즐김',
        },
        {
            type_id: 'ENTJ',
            img: 'mbti/entj.png',
            content1: '대담하고 결단력 있는 성격',
            content2: '리더십과 조직 능력이 뛰어남',
            content3: '목표를 달성하기 위해 계획적으로 행동함',
        },
    ];
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
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
                                    onClick={() =>
                                        openModal(data.type_id, data.img, data.content1, data.content2, data.content3)
                                    }
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
                            <ModalDescription>
                                ► {selectedCard.content1}
                                <br />
                                <br />► {selectedCard.content2}
                                <br />
                                <br />► {selectedCard.content3}
                            </ModalDescription>

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
