import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardContent, Typography, Button } from '@mui/material';
import styled from 'styled-components';


const Title = styled.h1`
    padding: 20px;
    font-size: 50px;
    text-align:center;
`

const Personalities = () => {
    const sliderRef = useRef(null);

    const next = () => {
        sliderRef.current.slickNext();
    };

    const previous = () => {
        sliderRef.current.slickPrev();
    };

    const NextArrow = (props) => {
        const { className, onClick } = props;
        return (
            <Button className={className} onClick={onClick}>

            </Button>
        );
    };

    const PrevArrow = (props) => {
        const { className, onClick } = props;
        return (
            <Button className={className} onClick={onClick}>

            </Button>
        );
    };

    // 임시 데이터
    const cardData = [
        { title: 'Card 1', description: 'Description 1' },
        { title: 'Card 2', description: 'Description 2' },
        { title: 'Card 3', description: 'Description 3' },
        { title: 'Card 4', description: 'Description 4' },
        { title: 'Card 5', description: 'Description 5' }
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
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <Title>MBTI 유형</Title>
            <div style={{ margin: "100px auto" }}>
                <div style={{ padding: "0px 40px" }}>

                    <Button onClick={previous} >
                    </Button>
                    <Slider ref={sliderRef} {...settings}>
                        {cardData.map((data, index) => (
                            <div key={index}>
                                <Card sx={{ mr: 2, minHeight: 400 }}>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {data.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {data.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </Slider>
                    <Button onClick={next}>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Personalities;
