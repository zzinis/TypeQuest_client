import React from 'react';
import { Avatar, Typography, Box, Button, Grid, Paper, TextField, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';
import MainHeader from './Header';
import Footer from './Footer';


const customTheme = createTheme({
    typography: {
        fontFamily: 'Noto Sans KR, sans-serif',
        h5: {
            fontSize: '40px',
            fontWeight: 'bold',
            color: '#333',
        },
        body1: {
            fontSize: '18px',
            fontWeight: '500'
        },
    },
    palette: {
        primary: {
            main: '#42a5f5',
        },
    },
});




const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
    minHeight: '600px',
    marginTop: "100px",
    width: "600px",

}));

const initialUsers = [
    {
        id: 'testId1',
        pw: 'testpw1',
        name: 'John Doe',
        email: 'john@example.com',
        img: 'dog'
    },
    {
        id: 'testId2',
        pw: 'testpw2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        img: 'pig'
    },
    {
        id: 'testId3',
        pw: 'testpw3',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        img: 'hamster'
    },
    {
        id: 'testId4',
        pw: 'testpw4',
        name: 'Bob Wilson',
        email: 'bob@example.com',
        img: 'cat'
    }
];

const MyPage = () => {
    const [user, setUser] = React.useState(initialUsers[0]);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedUser, setEditedUser] = React.useState({});

    const handleProfileEdit = () => {
        setIsEditing(true);
        setEditedUser(user);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        setUser(editedUser);
        setIsEditing(false);
    };
    return (
        <>
            <MainHeader />
            <ThemeProvider theme={customTheme}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <StyledPaper elevation={3}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <Grid item>
                                {isEditing ? (
                                    <Avatar alt="User Avatar" src={`/path/to/${editedUser.img}.jpg`} sx={{ width: 120, height: 120 }} />
                                ) : (
                                    <Avatar alt="User Avatar" src={`/path/to/${user.img}.jpg`} sx={{ width: 120, height: 120 }} />
                                )}
                            </Grid>
                            <Grid item>
                                {isEditing ? (
                                    <TextField
                                        name="name"
                                        label="이름"
                                        value={editedUser.name || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <Typography variant="h4" component="h1">
                                        {user.name}
                                    </Typography>
                                )}

                                <Typography variant="subtitle1" component="p" color="textSecondary">
                                    {isEditing ? (
                                        <TextField
                                            name="email"
                                            label="이메일"
                                            value={editedUser.email || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </Typography>
                            </Grid>
                            <Grid item>
                                {isEditing ? (
                                    <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                                        저장
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="primary" onClick={handleProfileEdit}>
                                        프로필 편집
                                    </Button>
                                )}
                            </Grid>
                        </Grid>

                        <Box mt={3}>
                            <Typography variant="h6" component="h2" mt={6}>
                                개인 정보
                            </Typography>
                            <Typography variant="body1" component="p" mt={1} color="textSecondary">
                                아이디 :  {isEditing ? (
                                    <TextField
                                        name="id"
                                        label="ID"
                                        value={editedUser.id || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    user.id
                                )}
                            </Typography>
                            <Typography variant="body1" component="p" mt={1} color="textSecondary">
                                비밀번호 :  {isEditing ? (
                                    <TextField
                                        type="password"
                                        name="pw"
                                        label="비밀번호"
                                        value={editedUser.pw || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    ' ********'
                                )}
                            </Typography>
                            <Typography variant="body1" component="p" mt={1} color="textSecondary">
                                이메일 : {user.email}
                            </Typography>
                        </Box>
                    </StyledPaper>
                </Box>
            </ThemeProvider>
            <Footer />
        </>
    );
};

export default MyPage;
