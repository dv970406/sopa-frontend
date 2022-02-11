/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.11
 */

import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { loginModeState } from '../../utils/atoms';
import Form from '../form/Form';
import FormButton from '../form/FormButton';
import Input from '../form/Input';

interface IForm {
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

export default function SignUp() {
    const { register, handleSubmit } = useForm<IForm>();
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

    const onValid = ({ name, email, password, password2 }: IForm) => {
        if (loading) return;

        if (password !== password2) {
            alert("확인 비밀번호가 일치하지 않습니다.")
            return;
        };
        createUserMutation({
            variables: {
                name,
                email,
                password
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit(onValid)}>
            <input
                {...register("name", {
                    required: true
                })}
                type="text"
                placeholder="이름"
                required
                className={`
                    px-4 py-2 shadow-sm rounded-md w-full text-xl
                    border-2 border-gray-300  
                    placeholder:text-lg placeholder-gray-400
                    focus:placeholder-fuchsia-500 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500
                `}
            />
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
                className={`
                    px-4 py-2 shadow-sm rounded-md w-full text-xl
                    border-2 border-gray-300  
                    placeholder:text-lg placeholder-gray-400
                    focus:placeholder-fuchsia-500 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500
                `}
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
                className={`
                    px-4 py-2 shadow-sm rounded-md w-full text-xl
                    border-2 border-gray-300  
                    placeholder:text-lg placeholder-gray-400
                    focus:placeholder-fuchsia-500 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500
                `}
            />
            <input
                {...register("password2", {
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
                placeholder="비밀번호 확인"
                required
                className={`
                    px-4 py-2 shadow-sm rounded-md w-full text-xl
                    border-2 border-gray-300  
                    placeholder:text-lg placeholder-gray-400
                    focus:placeholder-fuchsia-500 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500
                `}
            />
            <FormButton
                text='회원가입'
                onClick={() => null}
            />
        </Form>
    )
}