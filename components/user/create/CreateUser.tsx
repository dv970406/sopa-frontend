/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.25
 */

import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { loginModeState } from '@utils/atoms';
import Form from '@components/form/Form';
import Input from '@components/form/Input';
import FormButton from '@components/form/FormButton';
import { useState } from 'react';

interface IForm {
    sendedCode?: number;
    name: string;
    email: string;
    password: string;
    password2: string;
}
interface ICreateUser {
    createUser: {
        ok: boolean;
        error?: string;
    }
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
    const { register, handleSubmit, watch, getValues } = useForm<IForm>();
    const setLoginMode = useSetRecoilState(loginModeState);

    const createUserCompleted = ({ createUser }: ICreateUser) => {
        const { ok, error } = createUser;
        if (!ok) {
            alert(error);
            return;
        };
        setLoginMode(true);
    };
    const [createUserMutation, { loading }] = useMutation(CREATE_USER_MUTATION, {
        onCompleted: createUserCompleted
    });

    const onValid = ({ name, email, password, sendedCode }: IForm) => {
        if (loading) return;

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

    const checkDisabledStatus = loading || !watch("email") || !watch("name") || !watch("password") || !watch("password2")

    const [isEmailValidationMode, setIsEmailValidationMode] = useState(false);

    const checkEmailValidation = async () => {
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
                    minLength={2}
                    maxLength={8}
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
                />
                <Input
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
                    type="password"
                    required
                    minLength={8}
                    maxLength={15}
                />
                <Input
                    register={register("password2", {
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
                    type="password2"
                    required
                    minLength={8}
                    maxLength={15}
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
                            onClick={handleSubmit(onValid)}
                            className='
                                bg-fuchsia-300 hover:bg-fuchsia-400 transition 
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
                        onClick={checkEmailValidation}
                    />
                )}
            </Form>
        </>
    )
}