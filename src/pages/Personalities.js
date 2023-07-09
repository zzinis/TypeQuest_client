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
    }
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
  text-align:center;
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
            type_id: 'ENTP',
            img: "travel/travel (16).png",
            content:
                'ENTP는 특유의 능글거리면서 경쾌한 성격과 문제의 본질을 파악하고 논리적으로 판단하려는 기질이 있고, 어느곳에서나 적응력이 빠른 성격이다. 본인이 구상하는 바를 실현시키고 싶어하는 기질이 강하며, 여기에 특유의 아웃사이더적인 성격까지 겹쳐 그야말로 혁명가의 기질을 띠고 있다.',
        },
        {
            type_id: 'ISFP',
            img: "travel/travel (16).png",
            content:
                '깊이 있는 대인관계를 유지하며 조용하고 신중하며 이해한 다음에 경험한다. 자기 내부에 주의를 집중함. 내부 활동과 집중력',
        },
        {
            type_id: 'ESTJ',
            img: "travel/travel (16).png",
            content:
                '현실적이며 리더십이 있는 ESTJ 유형의 사람들은 연인에게 책임감 있고 헌신적인 타입이며 연인에게도 책임감을 요구한다. 데이트를 할 때도 계획적으로 움직이며 안정적인 연애를 선호하는 편이기에 ESTJ와는 결혼까지 이어질 확률이 높으며, 혼인 후 안정적인 배우자가 될 가능성이 높다.',
        },
        {
            type_id: 'INTJ',
            img: '"travel/travel (15).png"',
            content: '매우 독립적인 성격으로 다른 사람의 기대를 따르기보다는 자신만의 아이디어를 추구',
        },
        {
            type_id: 'ENTJ',
            img: "travel/travel (16).png",
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
                                <CardWrapper key={data.type_id} onClick={() => openModal(data.type_id, data.img, data.content)}>
                                    <Card sx={{ mr: 2, minHeight: 400 }}>
                                        <CardContent>
                                            <Typography variant="h5" component="h2" style={{ marginBottom: '10px', textAlign: 'center' }}>
                                                {data.type_id}
                                            </Typography>
                                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                                <img src={data.img} alt={data.type_id} style={{ width: '80%', height: 'auto', objectFit: 'cover' }} />
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
                                <img src={selectedCard.img} alt={selectedCard.type_id} style={{ width: '80%', height: 'auto', objectFit: 'cover' }} />
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
}

export default Personalities;
