import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

function Ask() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [inquiries, setInquiries] = useState([]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = () => {
        const newInquiry = {
            id: Date.now(),
            title: title,
            content: content,
        };

        setInquiries([...inquiries, newInquiry]);

        setTitle('');
        setContent('');
    };

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
                문의 등록
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
                        <Typography variant="h6">{inquiry.title}</Typography>
                        <Box sx={{ flexGrow: 1, whiteSpace: 'pre-wrap' }}>
                            <Typography>{inquiry.content}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="outlined"
                                sx={{ marginRight: 1 }}
                                onClick={() => {
                                    // 수정 버튼 동작
                                    console.log('수정 버튼이 클릭되었습니다.');
                                }}
                            >
                                수정
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    // 삭제 버튼 동작
                                    setInquiries(inquiries.filter((item) => item.id !== inquiry.id));
                                }}
                            >
                                삭제
                            </Button>
                        </Box>
                    </Box>
                ))}
            </div>
        </Box>
    );
}

export default Ask;
