import React, { useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import Chat from './Chat';
import MainHeader from './Header';
import Footer from './Footer';
import { SERVER } from '../lib/constant';
// 임시 소켓 주소
const socket = io.connect(`${SERVER}`);

// 채팅방 들어가기 전 닉네임,룸 설정
// 같은 MBTI끼리 연결 필요

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const JoinChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    padding: 20px;
    border-radius: 5px;
    background-color: #c3e6f7;
    width: 500px;
    height: 80vh;
`;

const Title = styled.h3`
    margin-bottom: 80px;
    font-size: 40px;
`;

const Input = styled.input`
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    height: 30px;
    width: 200px;
`;

const Button = styled.button`
    width: 220px;
    height: 50px;
    margin-top: 80px;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #4b8fed;
    color: white;
    font-weight: bold;
    cursor: pointer;
    border: none;
`;

function ChatLogin() {
    const [username, setUsername] = useState('');
    const [test, setTest] = useState('');
    const [room1, setRoom1] = useState('');
    const [room2, setRoom2] = useState('');
    const [room3, setRoom3] = useState('');
    const [showChat, setShowChat] = useState(false);

    //질문(room1의 숫자만 바꾸고 싶어요)
    const joinRoom = () => {
        if (username !== '' && test !== '' && room1 !== '') {
            socket.emit('join_room', room1);
            setShowChat(true);
        } else if (username !== '' && test !== '' && room2 !== '') {
            socket.emit('join_room', room2);
            setShowChat(true);
        } else if (username !== '' && test !== '' && room3 !== '') {
            socket.emit('join_room', room3);
            setShowChat(true);
        }
    };

    const handleTestChange = (event) => {
        setTest(event.target.value);
    };

    const handleRoomChange1 = (event) => {
        setRoom1(event.target.value);
    };

    const handleRoomChange2 = (event) => {
        setRoom2(event.target.value);
    };

    const handleRoomChange3 = (event) => {
        setRoom3(event.target.value);
    };

    return (
        <AppContainer>
            <MainHeader />
            {!showChat ? (
                <JoinChatContainer>
                    <Title>MBTI CHAT</Title>
                    <Input
                        type="text"
                        placeholder="Username"
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <select
                        value={test}
                        onChange={handleTestChange}
                        style={{
                            marginBottom: '10px',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            height: '50px',
                            width: '200px',
                        }}
                    >
                        <option value="">Select a Test</option>
                        <option value="여행Test">여행Test</option>
                        <option value="유튜브Test">유튜브Test</option>
                        <option value="직업Test">직업Test</option>
                    </select>

                    {test === '여행Test' && (
                        <select
                            value={room1}
                            onChange={handleRoomChange1}
                            style={{
                                marginBottom: '10px',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                height: '50px',
                                width: '200px',
                            }}
                        >
                            <option value="">여행 select</option>
                            <option value="필리핀 보라카이">필리핀 보라카이</option>
                            <option value="일본 도쿄">일본 도쿄</option>
                            <option value="호주 멜버른">호주 멜버른</option>
                            <option value="프랑스 파리">프랑스 파리</option>
                            <option value="뉴질랜드 로드트립">뉴질랜드 로드트립</option>
                            <option value="인도네시아 발리">인도네시아 발리</option>
                            <option value="마카오">마카오</option>
                            <option value="태국 방콕">태국 방콕</option>
                            <option value="영국 런던">영국 런던</option>
                            <option value="베트남 호이안">베트남 호이안</option>
                            <option value="아이슬란드">아이슬란드</option>
                            <option value="이탈리아 로마">이탈리아 로마</option>
                            <option value="태국 치앙마이">태국 치앙마이</option>
                            <option value="오스트리아 할슈타트">오스트리아 할슈타트</option>
                            <option value="그리스">그리스</option>
                            <option value="싱가포르">싱가포르</option>
                        </select>
                    )}

                    {test === '유튜브Test' && (
                        <select
                            value={room2}
                            onChange={handleRoomChange2}
                            style={{
                                marginBottom: '10px',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                height: '50px',
                                width: '200px',
                            }}
                        >
                            <option value="">유튜브 select</option>
                            <option value="핵인싸">핵인싸</option>
                            <option value="빨리빨리">빨리빨리</option>
                            <option value="도라에몽">도라에몽</option>
                            <option value="박물관 지박령">박물관 지박령</option>
                            <option value="짱가형">짱가형</option>
                            <option value="고집불통">고집불통</option>
                            <option value="합석장인">합석장인</option>
                            <option value="광고형 여행자">광고형 여행자</option>
                            <option value="신밧드">신밧드</option>
                            <option value="보살">보살</option>
                            <option value="모험 변태">모험 변태</option>
                            <option value="광기 어린 계획 실천가">광기 어린 계획 실천가</option>
                            <option value="낭만적 거절가">낭만적 거절가</option>
                            <option value="충전형 이타주의자">충전형 이타주의자</option>
                            <option value="알쓸번잡">알쓸번잡</option>
                            <option value="계획 변태">계획 변태</option>
                        </select>
                    )}

                    <Button onClick={joinRoom}>채팅방 들어가기</Button>
                </JoinChatContainer>
            ) : (
                <Chat socket={socket} username={username} room={room1} />
            )}
            <Footer />
        </AppContainer>
    );
}

export default ChatLogin;
