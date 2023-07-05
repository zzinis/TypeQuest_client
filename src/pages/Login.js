import React, { useRef, useState } from 'react';
import { Wrapper, Inner } from './Main';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginHeader = styled.h1`
    font: bold 35px/1 'Noto Sans KR';
    margin-bottom: 70px;
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    border: solid 1px #a2adb1;
    height: 2.75rem;
    border-radius: 1.5rem;
    padding-left: 1rem;
    background-color: #fff;
    margin-bottom: 20px;
    & + label {
        margin-bottom: 1rem;
    }
`;

export const Label = styled.label`
    display: block;
    font-size: 1rem;
    font-weight: 700;
    margin-left: 17px;
    margin-bottom: 0.5rem;
    text-align: left;
    & + p {
        margin-top: 1rem;
    }
`;

export const Input = styled.input`
    height: 40px;
    margin-left: 0.8rem;
    width: calc(100% - 2rem);
    border: 1px solid #eee;
    border-radius: 10px;
`;

export const SubmitBtn = styled.button`
    display: block;
    background-color: #04202f;
    color: #fff;
    height: 3rem;
    padding: 0.625rem 1rem;
    border-radius: 1.5rem;
    font-weight: 700;
    width: 100%;
    margin: 2rem auto 0.8rem;
    &:hover {
        cursor: pointer;
    }
`;

export const Warn = styled.p`
    color: red;
    padding-left: 17px;
    font-size: 0.8rem;
    font-weight: 700;
    div + & {
        margin: 0.5rem 0 0.8rem;
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

function Login() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const user_id = useRef();
    user_id.current = watch('user_id');

    const password = useRef();
    password.current = watch('password');

    const [loading, setLoading] = useState(false);

    // 로그인 버튼 클릭시 데이터 연결

    let body = {
        user_id,
        password,
    };

    const onSubmit = (data) => {
        axios
            .post('http://localhost:8000/login', body)
            .then((response) => {
                console.log('d', response.data); // 서버 응답 확인
                // 로그인 성공 처리 로직을 여기에 작성하세요.
                if (response.data.result == false) {
                    alert(response.data.msg);
                    window.location.href = '../Login';
                    return;
                } else {
                    navigate('../MbtiPage');
                }
            })
            .catch((error) => {
                console.error(error); // 에러 처리
            });
    };

    return (
        <>
            <Wrapper>
                <Inner>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Filed>
                            <Hidden>로그인 양식 </Hidden>
                            <LoginHeader>로그인</LoginHeader>

                            <Label htmlFor="user_id">아이디:</Label>
                            <InputContainer>
                                 <Input
                  name="user_id"
                  placeholder="아이디"
                  {...register('user_id', { required: '아이디를 입력해주세요', maxLength: { value: 10, message: "아이디는 10자 이하로 만들어주세요," } })}
                />
                            </InputContainer>
                            {errors.user_id && <Warn>{errors.user_id.message}</Warn>}

                            <Label htmlFor="password">비밀번호:</Label>
                            <InputContainer>
                                <Input
                                    name="password"
                                    placeholder="비밀번호를 입력하세요"
                                    {...register('password', {
                                        required: '비밀번호를 입력해주세요',
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,24}$/,
                                            message: ' 비밀번호는 대문자와 숫자를 포함하여 4자리 이상 입력해주세요',
                                        },
                                    })}
                                />
                            </InputContainer>
                            {errors.password && <Warn>{errors.password.message}</Warn>}
                        </Filed>
                        <SubmitBtn type="submit" disabled={loading}>
                            로그인
                        </SubmitBtn>
                    </form>
                </Inner>
            </Wrapper>
        </>
    );
}

export default Login;
