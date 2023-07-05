import React, { useRef, useState } from 'react'
import { Wrapper, Inner } from './Main';
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const LoginHeader = styled.h1`
    font: bold 35px/1 'Noto Sans KR';
    margin-bottom:70px;
`
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: solid 1px #a2adb1;
  height: 2.75rem;
  border-radius: 1.5rem;
  padding-left: 1rem;
  background-color: #fff;
  margin-bottom:20px;
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
  text-align:left;
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
  border:none;
`

export const Hidden = styled.legend`
 position:absolute;
 top:-9999px;
 opacity:0;
`


// 리액트 hook form 회원가입 

function Login() {

    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const password = useRef();
    password.current = watch('password');

    const [loading, setLoading] = useState(false);

    // 회원가입 버튼 클릭시 데이터 연결

    const onSubmit = async (data) => {
        setLoading(true);
        console.log(data);
        const { user_id, password, name, email } = data;
        try {
            const response = await axios.post("/signin", {
                user_id,
                password,
                name,
                email,
            });
            alert("회원가입 완료!")
            navigate('../Login');

        } catch (error) {
            alert(error.response.data);
        }
        setLoading(false);
        // 회원가입 완료 되면 페이지 이동
        navigate('../Login');


    }


    return (
        <>
            <Wrapper>
                <Inner>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Filed>
                            <Hidden>회원가입 폼 양식 </Hidden>
                            <LoginHeader>회원가입</LoginHeader>

                            <Label htmlFor="user_id">아이디:</Label>
                            <InputContainer>
                                <Input
                                    name="user_id"
                                    placeholder="아이디"
                                    {...register('user_id', { required: '아이디를 입력해주세요', maxLength: { value: 10, message: "아이디는 10자 이하로 만들어주세요," } })}
                                />
                            </InputContainer>
                            {errors.user_id && <Warn>{errors.user_id.message}</Warn>}
                            {/* {errors?.user_id?.type === "maxLength" && (<p>ID는 10자를 초과할 수 없습니다.</p>)} */}

                            <Label htmlFor="password">비밀번호:</Label>
                            <InputContainer>
                                <Input
                                    name="password"
                                    placeholder="비밀번호를 입력하세요"
                                    {...register('password', { required: '비밀번호를 입력해주세요', pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,24}$/, message: ' 비밀번호는 대문자와 숫자를 포함하여 4자리 이상 입력해주세요' } })}
                                />
                            </InputContainer>
                            {errors.password && <Warn>{errors.password.message}</Warn>}

                            <Label htmlFor='email'>이메일:</Label>
                            <InputContainer>
                                <Input
                                    name="email"
                                    placeholder="이메일"
                                    {...register('email', { required: '이메일을 입력해주세요', pattern: { value: /\S+@\S+\.\S+/, message: '이메일 형식에 맞지 않습니다' } })}
                                />
                            </InputContainer>
                            {errors.email && <Warn>{errors.email.message}</Warn>}
                            <Label htmlFor="name">이름:</Label>
                            <InputContainer>
                                <Input
                                    name="name"
                                    placeholder="이름"
                                    {...register('name', { required: '이름을 입력해주세요' })}
                                />

                            </InputContainer>
                            {errors.name && <Warn>{errors.name.message}</Warn>}

                        </Filed>
                        <SubmitBtn type="submit" disabled={loading}>회원가입</SubmitBtn>
                    </form>

                </Inner>
            </Wrapper >
        </>
    )
}

export default Login;