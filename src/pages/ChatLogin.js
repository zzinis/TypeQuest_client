import React, { useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import Chat from './Chat';
// 임시 소켓 주소
const socket = io.connect('http://localhost:3001');

// 채팅방 들어가기 전 닉네임,룸 설정
// 같은 MBTI끼리 연결 필요 

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const JoinChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 5px;
  background-color: #f0f2f5;
  width: 500px;
  height: 800px;
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
    const [room, setRoom] = useState('');
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== '' && room !== '') {
            socket.emit('join_room', room);
            setShowChat(true);
        }
    };

    return (
        <AppContainer>
            {!showChat ? (
                <JoinChatContainer>
                    <Title>MBTI 채팅방</Title>
                    <Input
                        type='text'
                        placeholder='Username'
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <Input
                        type='text'
                        placeholder='Room ID'
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                    />
                    <Button onClick={joinRoom}>채팅방 들어가기</Button>
                </JoinChatContainer>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </AppContainer>
    );
}

export default ChatLogin;
