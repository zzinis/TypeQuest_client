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

    &:hover {
        border-bottom: 2px solid rgba(82, 88, 136, 1);
    }
    //모바일 사이즈
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
    return (
        <>
            <Header>
                <Logo src={LogoSrc} alt="" onClick={onClickHandler} />
                <Categories>
                    <Category>
                        <Link to="/Personalities">성격 유형</Link>
                    </Category>
                    <Category>
                        <Link to="/Mbtipage">테스트</Link>
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
