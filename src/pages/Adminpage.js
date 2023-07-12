import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import { SERVER } from '../lib/constant';

const MainTitle = styled.div`
    color: white;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    padding-top: 2rem;
    padding-bottom: 6rem;
`;

const CommentWraper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`;

const CommentContainer = styled.div`
    box-shadow: 0 2px 4px rgba(2, 2, 7, 0.8);
    color: white;
    width: 70%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 15rem; /* 각 박스 간격 조정 */
    align-self: stretch;
`;
const CommentInput = styled.textarea`
    background: none;
    background-color: white;
    border: none;
    color: black;
    display: flex;
    justify-content: center;
    width: 89.5%;
    height: 9.8rem;
    resize: none;
    font-size: 1rem;
`;

const CommentBox = styled.div`
    background: none;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0.05rem;
`;

const CommentExplain = styled.div`
    border-top: 1px solid black;
    background: none;
    background-color: rgb(200, 200, 200, 0.5);
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 10%;
    height: auto;
    padding: 0.1rem;
`;

const CommentContent = styled.div`
    border-top: 1px solid black;
    background: none;
    background-color: rgb(48, 48, 48, 0.5);
    color: white;
    padding: 1.3rem;
    width: 80%;
    height: auto;
    white-space: pre-wrap;
    flex: 1;
`;

const CommentInputContent = styled.div`
    border-top: 1px solid black;
    background: none;
    background-color: rgb(200, 200, 200, 0.5);
    color: black;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 10%;
    height: 10rem;
`;

const ButtonContainer = styled.div`
    display: flex;
`;

const CommentSaveButton = styled.button`
    width: auto;
    height: 2.5rem;
    color: white;
    background: none;
    background-color: gray;
    margin: 0.5rem;
    border-radius: 0.5rem;

    &:hover {
        background-color: rgb(50, 50, 50, 1); /* Change background color on hover */
        cursor: pointer;
    }
`;

const AdminPage = () => {
    const [posts, setPosts] = useState('');
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        axios
            .get(`${SERVER}/adminpage`)
            .then((result) => {
                setInquiries(result.data);
            })
            .catch((error) => {
                console.error('문의 가져오기에 실패했습니다:', error);
            });
    }, [inquiries]);

    const handleInputChange = (event) => {
        setPosts(event.target.value);
    };

    const saveComment = (getAskId) => {
        const ask_id = getAskId;
        const data = {
            ask_id: ask_id,
            comment: posts,
        };

        axios
            .patch(`${SERVER}/adminpage`)
            .then((result) => {
                setInquiries(result.data);
            })
            .catch((error) => {
                console.error('문의 업데이트에 실패했습니다:', error);
            });
    };
    const delComment = () => {};

    return (
        <div>
            <Header></Header>
            <MainTitle>문의 관리</MainTitle>
            {inquiries.map((inquirie) => (
                <div key={inquirie.ask_id}>
                    <CommentWraper>
                        <CommentContainer>
                            <CommentBox>
                                <CommentExplain>사용자ID</CommentExplain>
                                <CommentContent>{inquirie.user_id}</CommentContent>
                            </CommentBox>

                            <CommentBox>
                                <CommentExplain>제목</CommentExplain>
                                <CommentContent>{inquirie.title}</CommentContent>
                            </CommentBox>

                            <CommentBox>
                                <CommentExplain>문의글</CommentExplain>
                                <CommentContent>{inquirie.content}</CommentContent>
                            </CommentBox>

                            <CommentBox>
                                <CommentExplain>답변</CommentExplain>
                                {inquirie.manager_msg ? (
                                    <CommentContent>{inquirie.manager_msg}</CommentContent>
                                ) : (
                                    <CommentContent>none</CommentContent>
                                )}
                            </CommentBox>
                            <CommentBox>
                                <CommentInputContent>답변작성</CommentInputContent>
                                <CommentInput onChange={handleInputChange}></CommentInput>
                            </CommentBox>

                            <ButtonContainer>
                                <CommentSaveButton onClick={() => saveComment(inquirie.ask_id)}>저장</CommentSaveButton>
                                <CommentSaveButton onClick={delComment}>문의글 삭제</CommentSaveButton>
                            </ButtonContainer>
                        </CommentContainer>
                    </CommentWraper>
                </div>
            ))}
            <Footer></Footer>
        </div>
    );
};

export default AdminPage;
