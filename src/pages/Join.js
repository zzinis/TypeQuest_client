import React, { useRef, useState } from 'react';
import { Wrapper, Inner } from './Main';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import MainHeader from './Header';
import Footer from './Footer';

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 15px;
    position: relative; /* 추가 */
`;
export const Input = styled.input`
    width: 460px;
    /* 테두리 상단 둥글게 */
    border: 1px solid #777;
    border-radius: 15px 15px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    min-height: 50px;
    padding: 0 10px 0 15px;
`;

export const InputBottom = styled.input`
    width: 460px;
    /* 테두리 하단 둥글게 */
    border: 1px solid #777;
    border-radius: 0px 0px 15px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    min-height: 50px;
    padding: 0 10px 0 15px;
`;
export const WarningContainer = styled.div`
    display: flex;
`;

export const SubmitBtn = styled.button`
    border: 0px;
    display: block;
    background-color: #04202f;
    color: #fff;
    height: 3rem;
    padding: 0.625rem 1rem;
    border-radius: 15px;
    font-weight: 700;
    width: 460px;
    max-width: 100%;
    margin: 2rem auto 0.8rem;
    &:hover {
        cursor: pointer;
    }
`;

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    width: 460px;
    align-items: center;
    justify-content: center;
`;
export const Warn = styled.p`
    display: flex;
    align-items: center;
    color: rgba(82, 88, 136, 1);
    font-size: 0.8rem;
    font-weight: 700;
    position: absolute;
`;

export const SlectProfile = styled.div`
    width: 100%;
    height: 6rem;
    border-radius: 100px;
    background-color: rgba(82, 88, 136, 0.8);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;
const ProfileImage = styled.img`
    width: 80%;
    height: 80%;
    border-radius: 100%;
    object-fit: cover;
`;

export const Profile = styled.label`
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    object-fit: cover;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    input[type='checkbox'] {
        width: 100%;
        height: 100%;
        display: none;
        border: 5px solid white;
    }

    &:hover {
        width: 5.2rem;
        height: 5.2rem;
    }

    input[type='checkbox']:checked + ${ProfileImage} {
        width: 100%;
        height: 100%;
    }
`;

export const Filed = styled.fieldset`
    border: none;
`;

export const Hidden = styled.legend`
    position: absolute;
    top: -9999px;
    opacity: 0;
`;

// 리액트 hook form 회원가입

function Login() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const password = useRef();
    password.current = watch('password');

    const [loading, setLoading] = useState(false);

    // 회원가입 버튼 클릭시 데이터 연결

    const [selectedProfile, setSelectedProfile] = useState('');

    const handleProfileSelection = (profile) => {
        setSelectedProfile(profile);
        console.log('확인', selectedProfile);
    };

    const onSubmit = async (data, selectedProfile) => {
        console.log(selectedProfile);
        setLoading(true);
        console.log(data);
        const { user_id, password, name, email } = data;
        //이미지데이터 DB저장 형식으로 변환 코드 추가
        try {
            const response = await axios.post('http://localhost:8000/signin', {
                user_id,
                password,
                name,
                email,
            });
            if (response.data.result === 'user') {
                alert(response.data.msg);
                window.location.href = '../Login';
            } else if (response.data.result === false) {
                alert(response.data.msg);
                window.location.href = '../Join';
                return;
            } else {
                alert('회원가입 완료!');
                navigate('../Login');
            }
        } catch (error) {
            alert(error.response.data);
        }
        setLoading(false);
        // 회원가입 완료 되면 페이지 이동
    };
    return (
        <>
            <MainHeader />
            <Wrapper>
                <Inner>
                    <div className="signInForm">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Filed>
                                <Hidden>회원가입 폼 양식 </Hidden>

                                <h1>회원가입</h1>
                                <InputContainer>
                                    <InputWrapper>
                                        <Input
                                            className={`Input_top ${errors.user_id ? 'error' : ''}`}
                                            name="user_id"
                                            placeholder="아이디"
                                            {...register('user_id', {
                                                required: '아이디를 입력해주세요',
                                                maxLength: { value: 10, message: '아이디는 10자 이하로 만들어주세요,' },
                                            })}
                                        />
                                        {errors.user_id && <Warn>{errors.user_id.message}</Warn>}
                                    </InputWrapper>

                                    <InputWrapper>
                                        <InputBottom
                                            className={`Input_bottom ${errors.password ? 'error' : ''}`}
                                            name="password"
                                            type="password"
                                            placeholder="비밀번호를 입력하세요"
                                            {...register('password', {
                                                required: '비밀번호를 입력해주세요',
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,24}$/,
                                                    message:
                                                        '비밀번호는 대문자와 숫자를 포함하여 4자리 이상 입력해주세요',
                                                },
                                            })}
                                        />
                                        {errors.password && <Warn>{errors.password.message}</Warn>}
                                    </InputWrapper>
                                </InputContainer>

                                <InputContainer>
                                    <InputWrapper>
                                        <Input
                                            name="email"
                                            placeholder="이메일"
                                            {...register('email', {
                                                required: '이메일을 입력해주세요',
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message: '이메일 형식에 맞지 않습니다',
                                                },
                                            })}
                                        />
                                        {errors.email && <Warn>{errors.email.message}</Warn>}
                                    </InputWrapper>

                                    <InputWrapper>
                                        <InputBottom
                                            name="name"
                                            placeholder="이름"
                                            {...register('name', { required: '이름을 입력해주세요' })}
                                        />
                                        {errors.name && <Warn>{errors.name.message}</Warn>}
                                    </InputWrapper>
                                </InputContainer>
                                <br></br>
                                <h3>SELECT PROFILE</h3>
                                <SlectProfile>
                                    <Profile>
                                        <input
                                            type="checkbox"
                                            value="강아지"
                                            onChange={() => handleProfileSelection('강아지')}
                                            checked={selectedProfile === '강아지'}
                                        />
                                        <ProfileImage src="../../profile/강아지.jpg" />
                                    </Profile>
                                    <Profile>
                                        <input
                                            type="checkbox"
                                            value="고양이"
                                            onChange={() => handleProfileSelection('고양이')}
                                            checked={selectedProfile === '고양이'}
                                        />
                                        <ProfileImage src="../../profile/고양이.jpg" />
                                    </Profile>
                                    <Profile>
                                        <input
                                            type="checkbox"
                                            value="햄스터"
                                            onChange={() => handleProfileSelection('햄스터')}
                                            checked={selectedProfile === '햄스터'}
                                        />
                                        <ProfileImage src="../../profile/햄스터.jpg" />
                                    </Profile>
                                    <Profile>
                                        <input
                                            type="checkbox"
                                            value="돼지"
                                            onChange={() => handleProfileSelection('돼지')}
                                            checked={selectedProfile === '돼지'}
                                        />
                                        <ProfileImage src="../../profile/돼지.jpg" />
                                    </Profile>
                                    <Profile>
                                        <input
                                            type="checkbox"
                                            value="참새"
                                            onChange={() => handleProfileSelection('참새')}
                                            checked={selectedProfile === '참새'}
                                        />
                                        <ProfileImage src="../../profile/참새.jpg" />
                                    </Profile>
                                </SlectProfile>

                                <SubmitBtn type="submit" disabled={loading}>
                                    회원가입
                                </SubmitBtn>
                            </Filed>
                        </form>
                    </div>
                    <Footer />
                </Inner>
            </Wrapper>
        </>
    );
}

export default Login;
