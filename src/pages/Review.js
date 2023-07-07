import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

const Title = styled.div`
    padding-top: 5vh;
    padding-bottom: 5vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    color: white;
`;

const ChooseResult = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

// ---------------------------------------------

const ReviewWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 100px;
    padding-right: 100px;
`;

const BoardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const ContainerBoard = styled.div`
    margin: 10px;
    padding: 0px;
    background-color: white;
    display: flex;
    flex-direction: column;
    height: 400px;
    width: 300px;
    align-items: center;
    justify-content: center;

    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    position: relative;
`;
const BoardTop = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BoardBottom = styled.div`
    background-color: white;
    width: 100%;
    height: 30%;
    background-color: rgba(82, 88, 136, 0.8);
    text-align: center;
`;

const PhotoSpace = styled.div`
    width: 100%;
    height: 30%;
    /* background-color: red; */
`;

const BoardContent = styled.div`
    /* background-color: pink; */
    /* border-bottom: 1px solid black; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const BoardPhoto = styled.div`
    background-color: blue;
    width: 40%;
    height: 30%;
    border-radius: 100%;
    position: absolute;
    top: 62%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 5px solid white;
`;

const BoardUser_id = styled.div`
    margin-top: 4vh;
`;

const BoardResult = styled.div`
    /* background-color: pink; */
`;

const BoardTime = styled.div`
    /* background-color: pink; */
`;
const Review = () => {
    //review 테이블
    const [posts, setPosts] = useState([]);

    const [selectedOption, setSelectedOption] = useState('');

    //select에 결과 넣어주기
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        // 게시물 목록 가져오기(게시판 테이블)
        axios
            .get('http://localhost:8000/review')
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const extractDate = (dateTime) => {
        const [date] = dateTime.split('T');
        return date;
    };

    const formatTime = (dateTime) => {
        const dateObj = new Date(dateTime);
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();

        // 시간, 분, 초를 2자리로 표시하기 위해 패딩(padding) 추가
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
            seconds,
        ).padStart(2, '0')}`;

        return formattedTime;
    };

    return (
        <div>
            {/* 게시물의 title */}
            <Header></Header>
            <Title>
                <h1>Review</h1>
                <ChooseResult>
                    <h3>Type :&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                    <div>
                        <select value={selectedOption} onChange={handleSelectChange}>
                            <option value="">-- Select test--</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                </ChooseResult>
            </Title>
            <ReviewWrapper>
                <BoardWrapper>
                    {posts.map((post) => (
                        <ContainerBoard key={post.id}>
                            <BoardTop>
                                <BoardContent>{post.content}</BoardContent>
                            </BoardTop>
                            <PhotoSpace></PhotoSpace>
                            <BoardPhoto>
                                <img src="" />
                            </BoardPhoto>
                            <BoardBottom>
                                <BoardUser_id>{post.user_id}</BoardUser_id>
                                <BoardResult>{post.result}</BoardResult>
                                <BoardTime>
                                    {extractDate(post.created_at)} {formatTime(post.created_at)}
                                </BoardTime>
                            </BoardBottom>
                        </ContainerBoard>
                    ))}
                </BoardWrapper>
            </ReviewWrapper>
            <Footer></Footer>
        </div>
    );
};

export default Review;
