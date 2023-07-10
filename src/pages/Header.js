import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoSrc from '../assets/TQ.png';
//navigate
import { useNavigate } from 'react-router-dom';

const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    height: 10vh;

    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            height: 7.5vh;
        }
    }
`;

const Logo = styled.img`
    width: 200px;
    height: 10vh;
    cursor: pointer;
    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            width: 150px;
            height: 7.5vh;
        }
    }
`;

const Categories = styled.div`
    display: flex;
    justify-content: center;
    font: 18px/1 'Noto Sans KR';

    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            display: none;
        }
    }
`;

const Category = styled.div`
    margin: 5px 10px;
    padding: 10px;
    cursor: pointer;
    a {
        text-decoration: none;
        color: rgba(11, 31, 46, 1);
        &:hover {
            color: rgba(131, 25, 166, 1);

            border-bottom: 2px solid rgba(131, 25, 166, 1);
        }
    }
    // mobile size
    @media screen {
        @media (max-width: 768px) {
            margin: 5px 5px;
        }
    }
`;

const Sign = styled.div`
    display: flex;
    width: 200px;
    height: 100px;
    align-items: center;
    justify-content: center;
    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            width: 150px;
            height: 30px;
            padding: 5px;
        }
    }
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

    @media screen {
        @media (max-width: 768px) {
            width: 70px;
            height: 30px;
        }
    }
`;

function MainHeader() {
    const navigate = useNavigate();
    const onClickHandler = () => {
        // 로고 클릭시 메인 페이지로 이동
        navigate('/');
    };

    useEffect(() => {
        isLoggedIn();
        showAlert();
    }, []);
    //로그인 시 이용할 수 있는 기능에 넣어놓기
    function showAlert() {
        if (!isLoggedIn()) {
            // 로그인되지 않은 상태인지 확인
            alert('로그인 후 이용가능합니다.');
        }
    }

    function isLoggedIn() {
        let isLoggedIn = sessionStorage.getItem('user_data'); // 로그인 상태 확인
        isLoggedIn = isLoggedIn ? true : false;
        return isLoggedIn;
    }

    return (
        <>
            <Header>
                <Logo src={LogoSrc} alt="" onClick={onClickHandler} />
                <Categories>
                    <Category>
                        <Link to="/Personalities">성격 유형</Link>
                    </Category>
                    <Category>
                        <Link to="/MbtiPage">테스트</Link>
                    </Category>
                    <Category>
                        <Link to="/Review">후기</Link>
                    </Category>
                    <Category>
                        <Link to="/ChatLogin">채팅</Link>
                    </Category>
                </Categories>

                <Sign>
                    {isLoggedIn() === true ? (
                        <Link to="/Join">
                            <SignButton>로그아웃</SignButton>
                        </Link>
                    ) : (
                        <Link to="/Login">
                            <SignButton>로그인</SignButton>
                        </Link>
                    )}
                    {isLoggedIn() === true ? (
                        <Link to="/UserPage">
                            <SignButton>MyPage</SignButton>
                        </Link>
                    ) : (
                        <Link to="/Join">
                            <SignButton>회원가입</SignButton>
                        </Link>
                    )}
                </Sign>
            </Header>
        </>
    );
}

export default MainHeader;
