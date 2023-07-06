import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MainSrc from '../assets/mainimg.png';
import LogoSrc from '../assets/TQ.png';
import MainHeader from './Header';

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    margin: 0 auto;
    text-align: center;
`;

export const Inner = styled.div`
    margin: 0 auto;
    width: 800px;
    font: 14px/1 'arial';
    display: flex;
    flex-direction: column;
    background-color: rgba(82, 88, 136, 0.8);
    height: 750px;
    padding: 0px;
    color: white;
`;

const MainImg = styled.img`
    width: 300px;
    height: 300px;
    margin: 0 auto;
    text-align: center;
`;

function Main() {
    return (
        <>
            <Wrapper>
                <MainHeader />
                <Inner>
                    <MainImg src={MainSrc} alt="메인 이미지" />
                    <div className="hero__text">
                        <h1>"드디어 제 성격을 이해받을 수 있어서 정말 기뻐요."</h1>
                        <p>성격 테스트를 통해 자신의 성향과 행동에 대한 정확한 분석 결과를 확인해 보세요.</p>
                        <a href="/">
                            <>
                                <span className="button__text">검사 실시</span>
                                <span>
                                    <title>Go</title>
                                </span>
                            </>
                        </a>
                    </div>
                </Inner>
            </Wrapper>
        </>
    );
}

export default Main;
