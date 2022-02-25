/**
 * 생성일: 2022.02.17
 * 수정일: 2022.02.25
 */

import { gql, useMutation } from '@apollo/client'
import FormButton from '@components/form/FormButton'
import Input from '@components/form/Input'
import useMyInfo from 'hooks/useMyInfo'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

interface IForm {
    name: string;
    password?: string;
    password2?: string;
}

const EDIT_USER_MUTATION = gql`
    mutation editUser($name:String,$password:String){
        editUser(name:$name,password:$password){
            ok
            error
        }
    }
`

export default function EditUser() {
    const router = useRouter();
    const { register, handleSubmit, clearErrors, getValues, watch } = useForm<IForm>();
    const { seeMyInfo } = useMyInfo();

    const updateEditUser = (cache: any, { data }: any) => {
        const { editUser: { ok, error } } = data
        if (!ok) {
            alert(error);
            clearErrors();
            return;
        };
        const { name } = getValues();
        cache.modify({
            id: `User:${seeMyInfo?.id}`,
            fields: {
                name() {
                    return name
                }
            }
        })
        router.push("/");
    }
    const [editUser, { loading }] = useMutation(EDIT_USER_MUTATION, {
        update: updateEditUser
    })

    const onValid = ({ name, password, password2 }: IForm) => {
        if (loading) return;

        if (password !== password2) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        editUser({
            variables: {
                ...(name && { name }),
                ...(password && { password }),
            }
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onValid)}
            className={`
                    space-y-10
                `}
        >
            <Input
                type="name"
                register={register("name", {
                    minLength: {
                        value: 2,
                        message: "이름은 2글자 이상이어야 합니다."
                    },
                })}
                defaultValue={seeMyInfo?.name}
                required
                minLength={2}
                maxLength={8}
            />
            <Input
                disabled={true}
                type="email"
                defaultValue={seeMyInfo?.email}
            />

            {seeMyInfo?.socialLogin ? null : (
                <>
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
                        minLength={8}
                        maxLength={15}
                    />
                    <Input
                        type="password2"
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
                        required
                        minLength={8}
                        maxLength={15}
                    />
                </>
            )}

            <FormButton
                disabled={loading || !watch("password" || "password2")}
                text={`${seeMyInfo?.name}의 프로필 수정`}
                loading={loading}
            />
        </form>
    )
}