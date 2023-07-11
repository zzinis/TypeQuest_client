import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { SERVER } from '../lib/constant';

import axios from 'axios';

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
        if (editId) {
            // 수정 로직 작성
            const updatedInquiries = inquiries.map((inquiry) => {
                if (inquiry.id === editId) {
                    return {
                        ...inquiry,
                        title: title,
                        content: content,
                    };
                }
                return inquiry;
            });
            axios
                .patch(`${SERVER}/ask/${editId}`, { title, content })
                .then(() => {
                    setInquiries(updatedInquiries);
                    setEditId(null);
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
            console.log('user_id', user_id);
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
        const selectedInquiry = inquiries.find((inquiry) => inquiry.id === id);
        if (selectedInquiry) {
            setTitle(selectedInquiry.title);
            setContent(selectedInquiry.content);
            setEditId(id);
        }
    };

    const handleDelete = (id) => {
        setInquiries(inquiries.filter((inquiry) => inquiry.id !== id));

        // axios
        //     .delete(`/Ask/${id}`)
        //     .then(() => {
        //         setInquiries(inquiries.filter((inquiry) => inquiry.id !== id));
        //     })
        //     .catch((error) => {
        //         console.error('문의 삭제에 실패했습니다:', error);
        //         // 오류 처리 로직 추가
        //     });
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
                // 오류 처리 로직 추가
            });
    }, []);
    console.log(inquiries, 'inquiries');

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                문의 페이지
            </Typography>
            <div>
                <TextField
                    label="제목"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={handleTitleChange}
                    sx={{ marginBottom: 2 }}
                />
            </div>
            <div>
                <TextField
                    label="내용"
                    variant="outlined"
                    multiline
                    fullWidth
                    rows={4}
                    value={content}
                    onChange={handleContentChange}
                    sx={{ marginBottom: 2 }}
                />
            </div>
            <Button variant="contained" onClick={handleSubmit} sx={{ marginBottom: 2 }}>
                {editId ? '수정하기' : '문의 등록'}
            </Button>

            <div>
                {inquiries.map((inquiry) => (
                    <Box
                        key={inquiry.id}
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
                        {editId === inquiry.id ? (
                            <>
                                <TextField
                                    label="제목"
                                    variant="outlined"
                                    fullWidth
                                    value={title}
                                    onChange={handleTitleChange}
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    label="내용"
                                    variant="outlined"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    value={content}
                                    onChange={handleContentChange}
                                    sx={{ marginBottom: 2 }}
                                />
                                <Button variant="contained" onClick={handleSubmit} sx={{ marginBottom: 1 }}>
                                    수정하기
                                </Button>
                            </>
                        ) : (
                            <>
                                <Typography variant="h6">{inquiry.title}</Typography>
                                <Box sx={{ flexGrow: 1, whiteSpace: 'pre-wrap' }}>
                                    <Typography>{inquiry.content}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="outlined"
                                        sx={{ marginRight: 1 }}
                                        onClick={() => handleEdit(inquiry.id)}
                                    >
                                        수정
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={() => handleDelete(inquiry.id)}>
                                        삭제
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                ))}
            </div>
        </Box>
    );
}

export default Ask;
