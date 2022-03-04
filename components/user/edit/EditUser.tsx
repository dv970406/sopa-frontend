/**
 * 생성일: 2022.02.17
 * 수정일: 2022.03.03
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client'
import FormButton from '@components/form/FormButton'
import Input from '@components/form/Input'
import { IMutationResults } from '@utils/types/interfaces'
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
    const { seeMyInfo } = useMyInfo();
    const { register, handleSubmit, clearErrors, getValues, formState: { errors } } = useForm<IForm>({
        mode: "onChange",
        defaultValues: {
            name: seeMyInfo?.name
        }
    });

    // editUser Mutation 처리 후 cache 수정 작업
    const updateEditUser: MutationUpdaterFn = (cache, { data }) => {
        const { editUser: { ok, error } }: any = data
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
    const [editUser, { loading }] = useMutation<IMutationResults>(EDIT_USER_MUTATION, {
        update: updateEditUser
    })

    // form을 제출하면 비밀번호 일치여부 확인 후 Mutation 실행
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
            className="space-y-10"
        >
            <Input
                type="name"
                register={register("name", {
                    minLength: {
                        value: 2,
                        message: "이름은 2글자 이상이어야 합니다."
                    },
                })}
                error={errors.name?.message}
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
                            required: "비밀번호는 필수입니다.",
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
                        error={errors.password?.message}
                    />
                    <Input
                        type="password2"
                        register={register("password2", {
                            required: "확인 비밀번호는 필수입니다.",
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
                        error={errors.password2?.message}
                    />
                </>
            )}

            <FormButton
                text={`${seeMyInfo?.name}의 프로필 수정`}
                loading={loading}
            />
        </form>
    )
}