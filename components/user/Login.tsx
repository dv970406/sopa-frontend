/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.24
 */

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { tokenState } from '@utils/atoms';
import Divider from '../form/Divider';
import Form from '../form/Form';
import FormButton from '../form/FormButton';
import Input from '../form/Input';
import SocialLogin from './create/SocialLogin';
import { gql, useMutation } from '@apollo/client';

interface IForm {
    email: string;
    password: string;
};

const LOGIN_MUTATION = gql`
    mutation login($email:String!,$password:String!){
        login(email:$email,password:$password){
            ok
            token
            error
        }
    }
`;

interface ILoginCompleted {
    login: {
        ok: boolean;
        token?: string;
        error?: string;
    }
}

export default function Login() {
    const setToken = useSetRecoilState(tokenState);
    const { register, handleSubmit, watch, clearErrors, formState: { errors } } = useForm<IForm>();

    const loginCompleted = ({ login }: ILoginCompleted) => {
        const { ok, token, error } = login;

        if (!ok || !token) {
            alert(error);
            clearErrors();
            return;
        };

        setToken(token);
        //document.cookie = `TOKEN=${token}`;
        localStorage.setItem("TOKEN", token);
        router.push("/");
    }
    const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted: loginCompleted
    })
    const checkDisabledStatus = loading || !watch("email") || !watch("password");

    const router = useRouter();

    const onValid = async (data: IForm) => {
        if (loading) return;
        const { email, password } = data;

        loginMutation({
            variables: {
                email,
                password
            }
        });
    };

    return (
        <Form>
            <Input
                type="email"
                register={register("email", {
                    required: true,
                    pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
                        message: "이메일 양식을 지켜주세요."
                    }
                })}
                error={errors.email?.message!}
                required
            />
            <Input
                type="password"
                register={register("password", {
                    required: true,
                    pattern: {
                        value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/g,
                        message: "비밀번호는 영문, 숫자, 특수문자 포함 8~15자리입니다."
                    }
                })}
                error={errors.password?.message!}
                required
            />
            <FormButton
                disabled={checkDisabledStatus}
                loading={loading}
                text="로그인"
                onClick={handleSubmit(onValid)}
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
                <SocialLogin isAuthPage social='naver' />
                <SocialLogin isAuthPage social='github' />
                <SocialLogin isAuthPage social='kakao' />
            </div>
        </Form>
    )
}