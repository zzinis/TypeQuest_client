import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import axios from 'axios';

function AdminPage() {
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = () => {
        axios
            .get('/Ask')
            .then((response) => {
                setInquiries(response.data);
            })
            .catch((error) => {
                console.error('문의 목록을 가져오는데 실패했습니다:', error);
                // 오류 처리 로직 추가
            });
    };

    const handleDelete = (id) => {
        axios
            .delete(`/Ask/${id}`)
            .then(() => {
                setInquiries(inquiries.filter((inquiry) => inquiry.id !== id));
            })
            .catch((error) => {
                console.error('문의 삭제에 실패했습니다:', error);
                // 오류 처리 로직 추가
            });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                관리자 페이지
            </Typography>
            <div>
                {inquiries.map((inquiry) => (
                    <Box
                        key={inquiry.id}
                        sx={{
                            background: '#f5f5f5',
                            padding: 2,
                            marginBottom: 2,
                            borderRadius: '4px',
                        }}
                    >
                        <Typography variant="h6">{inquiry.title}</Typography>
                        <Typography>{inquiry.content}</Typography>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(inquiry.id)}
                            sx={{ marginTop: 1 }}
                        >
                            삭제
                        </Button>
                    </Box>
                ))}
            </div>
        </Box>
    );
}

export default AdminPage;
