/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.05
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
};

const CREATE_USER_MUTATION = gql`
    mutation createUser($name:String!,$email:String!,$password:String!){
        createUser(name:$name,email:$email,password:$password){
            ok
            error
        }
    }
`;

export default function CreateUser() {
    // 이메일로 보내진 코드를 state에 저장한다
    const [emailCode, setEmailCode] = useState<number | null>(null);
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<IForm>({
        mode: "onChange"
    });
    const setLoginMode = useSetRecoilState(loginModeState);

    // createUser Mutation처리 후 로그인 모드로 바꾸기
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

    // 이메일로 보내진 인증코드를 보고 입력한 코드와 state에 담겨진 코드가 일치하면 Mutation을 실행시킨다.
    const checkEmailValidation = () => {
        if (loading) return;

        const { name, email, password, sendedCode } = getValues();
        if (emailCode !== Number(sendedCode)) {
            alert("전송된 인증번호와 일치하지 않습니다.");
            return;
        };
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

    const [isEmailValidationMode, setIsEmailValidationMode] = useState(false);

    // form을 제출하면 비밀번호 일치여부, 이메일로 인증코드 전송을 하고 state에 담은 후 인증코드 입력모드로 바꾼다.
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
        ).json();

        if (!response.ok) {
            alert(response.message);
            return;
        };

        setEmailCode(response.sendedCode);
        setIsEmailValidationMode(true);
        alert(response.message);
    };

    return (
        <>
            <Form>
                <Input
                    register={register("name", {
                        required: "이름은 필수입니다.",
                        minLength: {
                            value: 2,
                            message: "이름은 2글자 이상이어야 합니다."
                        }
                    })}
                    type="name"
                    error={errors.name?.message}
                    required
                />
                <Input
                    register={register("email", {
                        required: "이메일은 필수입니다.",
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
                            message: "이메일 양식을 지켜주세요."
                        }
                    })}
                    type="email"
                    error={errors.email?.message}
                    required
                />
                <Input
                    register={register("password", {
                        required: "비밀번호는 필수입니다.",
                        pattern: {
                            value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/g,
                            message: "비밀번호는 영문, 숫자, 특수문자 포함 8~15자리입니다."
                        }
                    })}
                    type="password"
                    error={errors.password?.message}
                    required
                    minLength={8}
                    maxLength={15}
                />
                <Input
                    register={register("password2", {
                        required: "확인 비밀번호는 필수입니다.",
                        pattern: {
                            value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/g,
                            message: "비밀번호는 영문, 숫자, 특수문자 포함 8~15자리입니다."
                        }
                    })}
                    type="password2"
                    error={errors.password2?.message}
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
                                maxLength: 6
                            })}
                            type="text"
                            placeholder='인증번호를 입력하세요'
                            maxLength={6}
                            className="focus:outline-none dark:bg-dark-default"
                        />
                        <button
                            onClick={checkEmailValidation}
                            className="
                                rounded-xl 
                                px-4 py-3 
                                bg-sopa-pure text-white font-semibold text-sm
                                hover:bg-sopa-default 
                                transition 
                            "
                        >
                            회원가입
                        </button>
                    </div>
                ) : (
                    <FormButton
                        loading={loading}
                        text='이메일 인증'
                        onClick={handleSubmit(onValid)}
                    />
                )}
            </Form>
        </>
    );
};