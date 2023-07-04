import React, { useState } from 'react'
import { Wrapper, Inner } from './Main';
import { useForm } from "react-hook-form";
import styled from 'styled-components';


const FormWrap = styled.div`
display:block;
`


function Join() {

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    const validatePassword = (value) => {
        if (value.length < 6) {
            return '6자리보다 적게 입력해주세요.';
        }
        return true;
    };


    return (
        <>
            <Wrapper>
                <Inner>
                    <FormWrap onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("id", { required: true })} />
                        <input {...register("password", { required: true })} />
                        <input {...register("name", { required: true })} />

                        {/* <input {...register({ required: true })} type="text" name="id" />
                        <input {...register({ required: true, minLength: 4, validate: validatePassword })} type="password" name="password" />
                        <input {...register} type="text" name='name' /> */}
                        <button type="submit">Login</button>
                    </FormWrap>

                </Inner>
            </Wrapper>
        </>
    )
}

export default Join;