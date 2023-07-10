import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:8000');

// chat 스타일 컴포넌트
const ChatWindow = styled.div`
    width: 600px;
    height: 100%;
`;

const ChatHeader = styled.div`
    height: 45px;
    border-radius: 6px;
    background: #4b8fed;
    position: relative;
    cursor: pointer;
    padding: 10px;
`;

const ChatHeaderTitle = styled.p`
    display: block;
    padding: 0;
    color: #fff;
    font-size: 20px;
    font: bold 25px/1px 'arial';
`;

const ChatBody = styled.div`
    min-height: 600px;
    height: 100%;
    border: 1px solid #263238;
    background: #c3e6f7;
    position: relative;
`;

const MessageContainer = styled(ScrollToBottom)`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar {
        display: none;
    }
`;
const Message = styled.div`
  height: auto;
  padding: 10px;
  display: flex;

  &:last-child {
    margin-bottom: 0;
  }

  &.you {
    justify-content: flex-start;

    .message-content {
      justify-content: flex-start;
    }

    .message-meta {
      justify-content: flex-start;
      margin-left: 5px;
    }
  }

  &.other {
    justify-content: flex-end;

    .message-content {
      justify-content: flex-end;
    }

    .message-meta {
      justify-content: flex-end;
      margin-right: 5px;
    }
  }
`;

const MessageContent = styled.div`
  width: auto;
  height: auto;
  min-height: 40px;
  max-width: 120px;
  background-color: #f4e9dc;
  border-radius: 5px;
  color: black;
  display: flex;
  align-items: center;
  margin-right: 5px;
  margin-left: 5px;
  padding-right: 5px;
  padding-left: 5px;
  overflow-wrap: break-word;
  word-break: break-word;
`;

// const Message = styled.div`
//     height: auto;
//     padding: 10px;
//     display: flex;

//     &:last-child {
//         margin-bottom: 0;
//     }

//     &.you {
//         justify-content: flex-start;

//         .message-content {
//             justify-content: flex-start;
//         }

//         .message-meta {
//             justify-content: flex-start;
//             margin-left: 5px;
//         }
//     }

//     &.other {
//         justify-content: flex-end;

//         .message-content {
//             justify-content: flex-end;
//             background-color: cornflowerblue;
//         }

//         .message-meta {
//             justify-content: flex-end;
//             margin-right: 5px;
//         }
//     }
// `;

// const MessageContent = styled.div`
//     width: auto;
//     height: auto;
//     min-height: 40px;
//     max-width: 120px;
//     background-color: #f4e9dc;
//     border-radius: 5px;
//     color: black;
//     display: flex;
//     align-items: center;
//     margin-right: 5px;
//     margin-left: 5px;
//     padding-right: 5px;
//     padding-left: 5px;
//     overflow-wrap: break-word;
//     word-break: break-word;
// `;

const MessageMeta = styled.div`
    display: flex;
    font-size: 12px;

    #author {
        margin-left: 10px;
        font-weight: bold;
    }
`;

const ChatFooter = styled.div`
    height: 40px;
    border: 1px solid #263238;
    border-top: none;
    display: flex;
`;

const ChatInput = styled.input`
    height: 100%;
    flex: 85%;
    border: 0;
    padding: 0 0.7em;
    font-size: 1em;
    border-right: 1px dotted #607d8b;
    outline: none;
    font-family: 'Open Sans', sans-serif;
`;

const SendButton = styled.button`
    border: 0;
    display: grid;
    place-items: center;
    cursor: pointer;
    flex: 15%;
    height: 100%;
    background: transparent;
    outline: none;
    font-size: 15px;
    color: lightgray;
    font-weight: bold;
    background-color: gray;

    &:hover {
        color: #f0f2f5;
    }
`;

function Chat({ username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.emit('join_room', room);

    return () => {
      socket.emit('leave_room', room);
    };
  }, [room]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (currentMessage.trim() !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };

      socket.emit('send_message', messageData);
      setMessageList((prevMessages) => [...prevMessages, messageData]);
      setCurrentMessage('');
    }
  };

  return (
    <ChatWindow>
      <ChatHeader>
        <ChatHeaderTitle>MBTI 채팅방</ChatHeaderTitle>
      </ChatHeader>
      <ChatBody>
        <MessageContainer>
          {messageList.map((messageContent, index) => (
            <Message key={index} className={username === messageContent.author ? 'you' : 'other'}>
              <MessageContent>{messageContent.message}</MessageContent>
              <MessageMeta>
                <p id="time">{messageContent.time}</p>
                <p id="author">{messageContent.author}</p>
              </MessageMeta>
            </Message>
          ))}
        </MessageContainer>
      </ChatBody>
      <ChatFooter>
        <ChatInput
          type="text"
          value={currentMessage}
          placeholder="채팅창에 입력하세요"
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        {/* 전송 누르면 채팅이 2번 입력됨 수정 필요 */}
        <SendButton onClick={sendMessage}>전송</SendButton>
      </ChatFooter>
    </ChatWindow>
  );
}

export default Chat;