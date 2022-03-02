/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.02
 */

import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { loginModeState } from '@utils/atoms';
import Form from '@components/form/Form';
import Input from '@components/form/Input';
import FormButton from '@components/form/FormButton';
import { useState } from 'react';
import { IMutationResults } from '@utils/types/interfaces';

interface IForm {
    sendedCode?: number;
    name: string;
    email: string;
    password: string;
    password2: string;
}

const CREATE_USER_MUTATION = gql`
    mutation createUser($name:String!,$email:String!,$password:String!){
        createUser(name:$name,email:$email,password:$password){
            ok
            error
        }
    }
`

export default function CreateUser() {
    const [emailCode, setEmailCode] = useState<number | null>(null)
    const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm<IForm>();
    const setLoginMode = useSetRecoilState(loginModeState);

    const createUserCompleted = ({ createUser }: IMutationResults) => {
        const { ok, error } = createUser;
        if (!ok) {
            alert(error);
            return;
        };
        setLoginMode(true);
    };
    const [createUserMutation, { loading }] = useMutation<IMutationResults>(CREATE_USER_MUTATION, {
        onCompleted: createUserCompleted
    });

    const checkEmailValidation = () => {
        if (loading) return;

        const { name, email, password, sendedCode } = getValues();
        if (emailCode !== Number(sendedCode)) {
            alert("전송된 인증번호와 일치하지 않습니다.");
            return;
        }
        createUserMutation({
            variables: {
                name,
                email,
                password
            }
        });
        setIsEmailValidationMode(false);
        setEmailCode(null);
        alert(`${name}님 환영합니다!`);
    };

    const checkDisabledStatus = loading || !watch("email") || !watch("name") || !watch("password") || !watch("password2");

    const [isEmailValidationMode, setIsEmailValidationMode] = useState(false);

    const onValid = async () => {
        const { password, password2 } = getValues();

        if (password !== password2) {
            alert("확인 비밀번호가 일치하지 않습니다.")
            return;
        };

        const { email } = getValues();

        const response = await (
            await fetch("/api/check-valid-email", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ email })
            })
        ).json()

        if (!response.ok) {
            alert(response.message);
            return;
        }

        setEmailCode(response.sendedCode);
        setIsEmailValidationMode(true);
        alert(response.message);
    }

    return (
        <>
            <Form>
                <Input
                    register={register("name", {
                        required: true,
                        minLength: {
                            value: 2,
                            message: "이름은 2글자 이상이어야 합니다."
                        }
                    })}
                    type="name"
                    required
                    error={errors.name?.message}
                />
                <Input
                    register={register("email", {
                        required: true,
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
                            message: "이메일 양식을 지켜주세요."
                        }
                    })}
                    type="email"
                    required
                    error={errors.email?.message}
                />
                <Input
                    register={register("password", {
                        required: true,
                        pattern: {
                            value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/g,
                            message: "비밀번호는 영문, 숫자, 특수문자 포함 8~15자리입니다."
                        }
                    })}
                    type="password"
                    required
                    error={errors.password?.message}
                />
                <Input
                    register={register("password2", {
                        required: true,
                        pattern: {
                            value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/g,
                            message: "비밀번호는 영문, 숫자, 특수문자 포함 8~15자리입니다."
                        }
                    })}
                    type="password2"
                    required
                    error={errors.password2?.message}
                />
                {isEmailValidationMode ? (
                    <div
                        className="flex m-auto"
                    >
                        <input
                            {...register("sendedCode", {
                                required: true,
                                minLength: 6,
                                maxLength: 6
                            })}
                            type="text"
                            placeholder='인증번호를 입력하세요'
                            minLength={6}
                            maxLength={6}
                        />
                        <button
                            onClick={checkEmailValidation}
                            className='
                                bg-sopa-pure hover:bg-sopa-default transition 
                                rounded-xl px-4 py-3 text-white font-semibold text-sm
                            '
                        >
                            회원가입
                        </button>
                    </div>
                ) : (
                    <FormButton
                        disabled={checkDisabledStatus}
                        loading={loading}
                        text='이메일 인증'
                        onClick={handleSubmit(onValid)}
                    />
                )}
            </Form>
        </>
    )
}