/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.09
 */

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { tokenState } from '../../utils/atoms';
import Divider from '../form/Divider';
import Form from '../form/Form';
import FormButton from '../form/FormButton';

interface IForm {
    email: string;
    password: string;
};

export default function Login() {
    const setTokenState = useSetRecoilState(tokenState);
    const { register, handleSubmit } = useForm<IForm>();
    const router = useRouter();

    const onValid = async (data: IForm) => {
        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(data)
        });

        const { login } = await response.json();

        if (login.ok) {
            setTokenState(login.token);
            router.push("/");
        };
    };

    return (
        <Form onSubmit={handleSubmit(onValid)}>
            <input
                {...register("email", {
                    required: true,
                    pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
                        message: "이메일 양식을 지켜주세요."
                    }
                })}
                type="text"
                placeholder="이메일"
                required
            />
            <input
                {...register("password", {
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
                type="password"
                placeholder="비밀번호"
                required
            />
            <FormButton
                onClick={() => null}
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
                <img className='w-12 h-12' src="/naver.png" />
                <img className='w-12 h-12' src="/github.png" />
                <img className='w-12 h-12' src="/kakaotalk.png" />
            </div>
        </Form>
    )
}