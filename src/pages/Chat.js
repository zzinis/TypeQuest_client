import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';

import io from 'socket.io-client';
import { SERVER } from '../lib/constant';

const socket = io.connect(`${SERVER}`);

const ChatWindow = styled.div`
    width: 600px;
    height: 80vh;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    justify-content: ${({ isKeyboardOpen }) => (isKeyboardOpen ? 'flex-start' : 'space-between')};
    transition: justify-content 0.3s;

    @media (max-width: 768px) {
        width: 100%;
        height: 70vh;
    }
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
    font-weight: bold;
    font-family: 'arial';
`;

const ChatBody = styled.div`
    flex-grow: 1;
    border: 1px solid #263238;
    background: #c3e6f7;
    position: relative;
    overflow: hidden;
`;

const MessageContainer = styled(ScrollToBottom)`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar {
        display: none;
    }

    scroll-behavior: smooth;
`;

const Message = styled.div`
    height: auto;
    padding: 10px;
    display: flex;

    &:last-child {
        margin-bottom: 0;
    }

    ${(props) =>
        props.isYou
            ? css`
                  justify-content: flex-end;

                  .message-content {
                      justify-content: flex-end;
                  }

                  .message-meta {
                      justify-content: flex-end;
                      margin-left: 5px;
                  }
              `
            : css`
                  justify-content: flex-start;

                  .message-content {
                      justify-content: flex-start;
                  }

                  .message-meta {
                      justify-content: flex-start;
                      margin-right: 5px;
                  }
              `}
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
    const messageContainerRef = useRef(null);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

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
    }, [room]);

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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.key === 'Done') {
            sendMessage();
            event.preventDefault();
        }
    };

    useEffect(() => {
        const adjustChatWindowHeight = () => {
            if (messageContainerRef.current) {
                const windowHeight = window.innerHeight;
                const messageContainerHeight = messageContainerRef.current.clientHeight;
                const chatHeaderHeight = 45;
                const chatFooterHeight = 40;
                const newChatWindowHeight = windowHeight - chatHeaderHeight - chatFooterHeight;
                const newChatBodyHeight = newChatWindowHeight - messageContainerHeight;
                messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;

                messageContainerRef.current.style.height = `${newChatBodyHeight}px`;
                document.documentElement.style.setProperty('--chat-window-height', `${newChatWindowHeight}px`);
            }
        };

        adjustChatWindowHeight();

        window.addEventListener('resize', adjustChatWindowHeight);

        // 키보드 이벤트 리스너 추가
        window.addEventListener('resize', handleKeyboardEvent);
        window.addEventListener('orientationchange', handleKeyboardEvent);
        document.addEventListener('focusin', handleKeyboardEvent);
        document.addEventListener('focusout', handleKeyboardEvent);

        return () => {
            window.removeEventListener('resize', adjustChatWindowHeight);

            // 키보드 이벤트 리스너 제거
            window.removeEventListener('resize', handleKeyboardEvent);
            window.removeEventListener('orientationchange', handleKeyboardEvent);
            document.removeEventListener('focusin', handleKeyboardEvent);
            document.removeEventListener('focusout', handleKeyboardEvent);
        };
    }, []);

    const handleKeyboardEvent = () => {
        const { innerHeight, documentElement } = window;
        const footerElement = document.querySelector('.chat-footer');

        if (footerElement) {
            const footerRect = footerElement.getBoundingClientRect();
            const isKeyboardOpen = innerHeight > footerRect.bottom;
            setIsKeyboardOpen(isKeyboardOpen);
            documentElement.style.setProperty('--chat-window-bottom', `${isKeyboardOpen ? '0' : '40px'}`);
        }
    };

    return (
        <ChatWindow isKeyboardOpen={isKeyboardOpen}>
            <ChatHeader>
                <ChatHeaderTitle>MBTI 채팅방</ChatHeaderTitle>
            </ChatHeader>
            <ChatBody>
                <MessageContainer ref={messageContainerRef}>{/* ... */}</MessageContainer>
            </ChatBody>
            <ChatFooter className="chat-footer">{/* ... */}</ChatFooter>
        </ChatWindow>
    );
}

export default Chat;
