import React from 'react';
import styled from 'styled-components';
import MainSrc from '../assets/mainimg.png';
import MainHeader from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
    height: 90vh;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    @media screen {
        //모바일 사이즈
        @media (max-width: 768px) {
            height: 92.5vh;
        }
    }
`;

export const Inner = styled.div`
    margin: 0 auto;
    width: 100%;
    font: 14px/1 'arial';
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(82, 88, 136, 1);
    height: 90vh;
    padding: 0px;
    color: white;
    @media screen {
        //모바일 사이즈
        @media (max-width: 768px) {
            height: 92.5vh;
        }
    }
`;

const MainImg = styled.img`
    width: 500px;
    height: 500px;
    margin: 0 auto;
    text-align: center;
    //모바일 사이즈
    @media screen {
        @media (max-width: 768px) {
            width: 400px;
            height: 400px;
        }
    }
`;
const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2c2c77;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none; // 링크 스타일 제거
  width: 200px; // 버튼의 너비 설정
  margin: 0 auto; // 가운데 정렬
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  span {
    margin-right: 5px;
  }

  &:hover {
    background-color: #1a1a4b;
  }
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
                        <Button to="/MbtiPage" className="button__text">검사 실시
                            <span>
                                <title>Go</title>
                            </span>
                        </Button>

                    </div>
                    <Footer />
                </Inner>
            </Wrapper>
        </>
    );
}

export default Main;
