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
`;

const commentWraper = styled.div`
    background-color: rgba(42, 48, 96, 1);
    color: white;
    display: flex;
    justify-content: center;
    width: 2rem;
    height: 1rem;
`;
const comment = styled.input`
    background: none;
    background-color: rgba(42, 48, 96, 1);
    color: white;
    display: flex;
    justify-content: center;
`;

const AdminPage = () => {
    const [posts, setPosts] = useState([]);
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
    }, []);

    return (
        <div>
            <Header></Header>
            <MainTitle>문의 관리</MainTitle>
            {inquiries.map((inquirie) => (
                <div key={inquirie.ask_id}>
                    <div>{inquirie.title}</div>
                    <div>{inquirie.content}</div>
                    <commentWraper>
                        <comment></comment>
                    </commentWraper>
                </div>
            ))}
            <commentWraper>
                <comment></comment>
            </commentWraper>
            <Footer></Footer>
        </div>
    );
};

export default AdminPage;
