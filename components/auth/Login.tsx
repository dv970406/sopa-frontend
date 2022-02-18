/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.18
 */

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { tokenState } from '@utils/atoms';
import Divider from '../form/Divider';
import Form from '../form/Form';
import FormButton from '../form/FormButton';
import Input from '../form/Input';
import { useState } from 'react';
import SocialLogin from './SocialLogin';

interface IForm {
    email: string;
    password: string;
};

export default function Login() {
    const setToken = useSetRecoilState(tokenState);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, watch, clearErrors } = useForm<IForm>();
    const checkDisabledStatus = loading || !watch("email") || !watch("password");

    const router = useRouter();

    const onValid = async (data: IForm) => {
        // 로딩도 사실 클라이언트 측에서 apollo/client를 바로 사용하면 loading prop을 쓸 수 있으므로 지금처럼 state처리할 필요는 없다.
        setLoading(true)

        // 폼 제출시 굳이 API Route로 안보내고 apollo/client의 useMutation hook으로 처리하면 되지만 찍먹은 해보자
        // 회원가입은 클라이언트 쪽에서 바로 Apollo 서버로 요청 보내게 했다.
        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(data),
        });

        const { login } = await response.json();

        // apollo/client useMutation의 onCompleted 역할
        if (!login.ok) {
            alert(login.error);
            clearErrors();
            setLoading(false);
            return;
        };
        setToken(login.token);
        //document.cookie = `TOKEN=${login.token}`;
        localStorage.setItem("TOKEN", login.token);
        router.push("/");
        setLoading(false);
    };

    return (
        <Form onSubmit={handleSubmit(onValid)}>
            <Input
                type="email"
                register={register("email", {
                    required: true,
                    pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
                        message: "이메일 양식을 지켜주세요."
                    }
                })}
                required
            />
            <Input
                type="password"
                register={register("password", {
                    required: true,
                    minLength: {
                        value: 8,
                        message: "비밀번호는 8자리 이상이어야 합니다."
                    },
                    maxLength: {
                        value: 15,
                        message: "비밀번호는 15자리 이하이어야 합니다."
                    },
                    pattern: {
                        value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/g,
                        message: "비밀번호는 영문, 숫자, 특수문자 포함 8~15자리입니다."
                    }
                })}
                required
            />
            <FormButton
                disabled={checkDisabledStatus}
                loading={loading}
                text="로그인"
            />
            <Divider text="소셜 로그인" />
            <div
                className={`
                    flex space-x-5
                    w-full
                    justify-center
                    items-center
                `}
            >
                <SocialLogin social='naver' />
                <SocialLogin social='github' />
                <SocialLogin social='kakao' />
            </div>
        </Form>
    )
}