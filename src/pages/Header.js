import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoSrc from '../assets/TQ.png';
//navigate
import { useNavigate } from 'react-router-dom';

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    height: 10vh;
`;

const Logo = styled.img`
    width: 200px;
    height: 10vh;
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
    const navigate = useNavigate();
    const onClickHandler = () => {
        // 로고 클릭시 메인 페이지로 이동
        navigate('/');
    };
    return (
        <>
            <Header>
                <Logo src={LogoSrc} alt="" onClick={onClickHandler} />
                <Categories>
                    <Category>
                        <Link to="/ChatLogin">성격 유형</Link>
                    </Category>
                    <Category>
                        <Link to="/TEST1">테스트</Link>
                    </Category>
                    <Category>
                        <Link to="/Review">후기</Link>
                    </Category>
                    <Category>{/* <Link to="/ChatLogin">채팅</Link> */}</Category>
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
