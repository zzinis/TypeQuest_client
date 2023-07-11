import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { SERVER } from '../lib/constant';

import axios from 'axios';
import MainHeader from './Header';
function Ask() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [inquiries, setInquiries] = useState([]);
    const [editId, setEditId] = useState(null);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = () => {
        console.log(editId, 'editId확인');
        if (editId) {
            // 수정 로직 작성
            const updatedInquiries = inquiries.map((inquiry) => {
                if (inquiry.ask_id === editId) {
                    return {
                        ...inquiry,
                        title: title,
                        content: content,
                    };
                }
                return inquiry;
            });
            axios
                .patch(`${SERVER}ask/${editId}`, { editId: editId, title: title, content: content })
                .then(() => {
                    setInquiries(updatedInquiries);
                    setEditId(null);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('문의 수정에 실패했습니다:', error);
                    // 오류 처리 로직 추가
                });

            setInquiries(updatedInquiries);
            setEditId(null);
        } else {
            // 등록 로직 작성
            const user_id = sessionStorage.getItem('user_data');
            // console.log('user_id', user_id);
            const newInquiry = {
                user_id: user_id,
                title: title,
                content: content,
            };

            setInquiries([...inquiries, newInquiry]);
            axios
                .post(`${SERVER}/ask`, newInquiry)
                .then(() => {
                    setInquiries([...inquiries, newInquiry]);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('문의 등록에 실패했습니다:', error);
                    // 오류 처리 로직 추가
                });
        }
        setTitle('');
        setContent('');
    };

    const handleEdit = (id) => {
        const selectedInquiry = inquiries.find((inquiry) => inquiry.ask_id === id);
        if (selectedInquiry) {
            setTitle(selectedInquiry.title);
            setContent(selectedInquiry.content);
            setEditId(id);
        }
    };

    const handleDelete = (id) => {
        // setInquiries(inquiries.filter((inquiry) => inquiry.ask_id !== id));
        console.log('id', id);
        axios
            .delete(`${SERVER}/ask/${id}`)
            .then(() => {
                setInquiries(inquiries.filter((inquiry) => inquiry.ask_id !== id));
                alert('확인용');
                // window.location.reload();
            })
            .catch((error) => {
                console.error('문의 삭제에 실패했습니다:', error);
                // window.location.reload();
                // 오류 처리 로직 추가
            });
    };

    useEffect(() => {
        const user_id = sessionStorage.getItem('user_data');
        axios
            .get(`${SERVER}/ask`, { params: { user_id } })
            .then((result) => {
                setInquiries(result.data);
            })
            .catch((error) => {
                console.error('문의 등록에 실패했습니다:', error);
            });
    }, []);

    return (
        <>
            <MainHeader></MainHeader>
            <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2, color: 'white', paddingTop: 5 }}>
                <fieldset style={{ border: '2px solid white' }}>
                    <legend>온라인 문의하기</legend>
                    {/* <Typography variant="h4" align="center" gutterBottom>
                    온라인 문의하기
                </Typography> */}

                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            maxWidth: 600,
                            margin: 'auto',
                            color: 'white',
                            fontSize: '1rem',
                            paddingBottom: '2.5rem',
                            paddingTop: '2.5rem',
                        }}
                    >
                        요청사항을 남겨주시면 신속하게 답변 드리겠습니다
                    </Typography>
                    <div>
                        <TextField
                            label="TITLE"
                            variant="outlined"
                            fullWidth
                            value={title}
                            onChange={handleTitleChange}
                            sx={{
                                marginBottom: 2,
                                paddingBottom: '2rem',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#FFFFFF',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#CCCCCC',
                                },
                            }}
                            InputLabelProps={{
                                sx: { color: '#FFFFFF' },
                            }}
                            InputProps={{
                                style: { color: 'white' },
                                autoComplete: 'off',
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Content"
                            variant="outlined"
                            multiline
                            fullWidth
                            rows={4}
                            value={content}
                            onChange={handleContentChange}
                            sx={{
                                marginBottom: 2,
                                color: 'white',
                                paddingBottom: '2rem',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#FFFFFF',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#CCCCCC',
                                },
                            }}
                            InputLabelProps={{
                                sx: { color: '#FFFFFF' },
                            }}
                            InputProps={{
                                style: { color: 'white' },
                                autoComplete: 'off',
                            }}
                        />
                    </div>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            marginBottom: 2,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            backgroundColor: 'rgba(42, 48, 96, 1)',
                            color: '#FFFFFF',
                            '&:hover': {
                                backgroundColor: 'rgba(22, 28, 76, 1)',
                                fontWeight: 'bold',
                            },
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {/* {editId ? '수정하기' : '문의하기'} */}
                        문의하기
                    </Button>
                </fieldset>
                <br />
                <br />
                <br />

                <div>
                    {inquiries.map((inquiry) => (
                        <Box
                            key={inquiry.ask_id}
                            sx={{
                                background: '#f5f5f5',
                                padding: 2,
                                marginBottom: 2,
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                            }}
                        >
                            {editId === inquiry.ask_id ? (
                                <>
                                    <TextField
                                        label="제목"
                                        variant="outlined"
                                        fullWidth
                                        value={title}
                                        onChange={handleTitleChange}
                                        sx={{ marginBottom: 2, color: 'white' }}
                                    />
                                    <TextField
                                        label="내용"
                                        variant="outlined"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={content}
                                        onChange={handleContentChange}
                                        sx={{ marginBottom: 2, color: 'white' }}
                                    />
                                    <Button variant="contained" onClick={handleSubmit} sx={{ marginBottom: 1 }}>
                                        수정하기
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h6" sx={{ marginBottom: 2, color: 'black' }}>
                                        {inquiry.title}
                                    </Typography>
                                    <Box sx={{ flexGrow: 1, whiteSpace: 'pre-wrap', color: 'black' }}>
                                        <Typography>{inquiry.content}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button
                                            variant="outlined"
                                            sx={{ marginRight: 1 }}
                                            onClick={() => handleEdit(inquiry.ask_id)}
                                        >
                                            수정
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDelete(inquiry.ask_id)}
                                        >
                                            삭제
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </Box>
                    ))}
                </div>
            </Box>
        </>
    );
}

export default Ask;
