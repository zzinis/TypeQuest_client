import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Wrapper } from './Main';
import { RiChat1Line, RiUserLine, RiSettingsLine } from 'react-icons/ri';
import TypingEffect from '../components/TypingEffect';
import MainHeader from './Header';
import Footer from './Footer';

const MbtiInner = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f9f9f9;
`;

const ButtonWrapper = styled.div`
    margin: 10px;
`;

const Button = styled.button`
    width: 200px;
    height: 60px;
    background-color: #f2f2f2;
    color: #000000;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #e6e6e6;
        cursor: pointer;
    }
`;

const IconStyle = {
    marginRight: '10px',
    fontSize: '24px',
};

const Heading = styled.h1`
    font-size: 48px;
    margin-bottom: 30px;
    color: #333333;
    font-weight: bold;
`;

function MbtiPage() {
    return (
        <>
            <MainHeader></MainHeader>
            <Wrapper>
                <MbtiInner>
                    <Heading>
                        <TypingEffect text="안녕하세요 MBTI TEST PAGE입니다" speed={60} fontSize="50px" />
                    </Heading>
                    <ButtonWrapper>
                        <Link to="/TravelTest">
                            <Button>
                                <RiChat1Line style={IconStyle} />
                                여행
                            </Button>
                        </Link>
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <Link to="/YoutubeTest">
                            <Button>
                                <RiUserLine style={IconStyle} />
                                유튜브
                            </Button>
                        </Link>
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <Link to="/JobTest">
                            <Button>
                                <RiSettingsLine style={IconStyle} />
                                직업
                            </Button>
                        </Link>
                    </ButtonWrapper>
                </MbtiInner>
            </Wrapper>
        </>
    );
}

export default MbtiPage;
