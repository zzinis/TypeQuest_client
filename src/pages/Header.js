import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoSrc from '../assets/TQ.png';

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
`;

const Logo = styled.img`
    width: 200px;
    height: 100px;
`;

const Categories = styled.div`
    display: flex;
    justify-content: center;
    font: 18px/1 'Noto Sans KR';
`;

const Category = styled.div`
    margin: 5px 10px;
    padding: 10px;
`;

const Sign = styled.div`
    display: flex;
    width: 200px;
    height: 100px;
    align-items: center;
    justify-content: center;
`;

const SignButton = styled.button`
    width: 90px;
    height: 40px;
    background-color: white;
    font: 14px/1 'Noto Sans KR';
    margin-left: auto;
    border: none;
    color: rgba(82, 88, 136, 1);
    cursor: pointer;
    margin: 4px;
`;

function MainHeader() {
    return (
        <>
            <Header>
                <Logo src={LogoSrc} alt="로고" />
                <Categories>
                    <Category>
                        <Link to="/TEST1">MBTI</Link>
                    </Category>
                    <Category>
                        <Link to="/TEST2">유튜버</Link>
                    </Category>
                    <Category>
                        <Link to="/TEST3">여행지</Link>
                    </Category>
                </Categories>

                <Sign>
                    <Link to="/Login">
                        <SignButton>로그인</SignButton>
                    </Link>
                    <Link to="/Join">
                        <SignButton>회원가입</SignButton>
                    </Link>
                </Sign>
            </Header>
        </>
    );
}

export default MainHeader;
