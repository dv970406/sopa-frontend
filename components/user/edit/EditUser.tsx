/**
 * 생성일: 2022.02.17
 * 수정일: 2022.03.14
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client';
import FormButton from '@components/form/FormButton';
import Input from '@components/form/Input';
import Button from '@components/shared/Button';
import { tokenState } from '@utils/atoms';
import { IMutationResults } from '@utils/types/interfaces';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useResetRecoilState } from 'recoil';

interface IForm {
    name: string;
    githubURL?: string;
    password?: string;
    password2?: string;
};
interface IEditUserComponent {
    id: number;
    email: string;
    name: string;
    githubURL?: string;
    socialLogin?: string;
}

const EDIT_USER_MUTATION = gql`
    mutation editUser($name:String,$githubURL:String,$password:String){
        editUser(name:$name,githubURL:$githubURL,password:$password){
            ok
            error
        }
    }
`;

export default function EditUser({ id, email, name, githubURL, socialLogin }: IEditUserComponent) {
    const resetToken = useResetRecoilState(tokenState);
    const router = useRouter();
    const { register, handleSubmit, clearErrors, getValues, setValue, formState: { errors } } = useForm<IForm>({
        mode: "onChange",
    });

    // editUser Mutation 처리 후 cache 수정 작업
    const updateEditUser: MutationUpdaterFn = (cache, { data }) => {
        const { editUser: { ok, error } }: any = data;
        if (!ok) {
            alert(error);
            clearErrors();
            return;
        };
        const { name } = getValues();
        cache.modify({
            id: `User:${id}`,
            fields: {
                name() {
                    return name;
                }
            }
        });
        router.push("/");
    };
    const [editUser, { loading }] = useMutation<IMutationResults>(EDIT_USER_MUTATION, {
        update: updateEditUser
    });

    // form을 제출하면 비밀번호 일치여부 확인 후 Mutation 실행
    const onValid = ({ name: newName, password, password2, githubURL: newGithubURL }: IForm) => {
        if (loading) return;

        if (password !== password2) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        };

        editUser({
            variables: {
                name: newName,
                password,
                githubURL: newGithubURL
            }
        });
    };

    const logOut = () => {
        router.replace("/");
        //쿠키의 토큰 삭제 코드
        document.cookie = `TOKEN=; expires=${new Date().toUTCString()};`;
        resetToken();
    };

    useEffect(() => {
        setValue("name", name);
        setValue("githubURL", githubURL);
    }, [name, githubURL, setValue]);

    return (
        <>
            <Button
                text="로그아웃"
                onClick={logOut}
                placeRight
            />
            <form
                onSubmit={handleSubmit(onValid)}
                className="space-y-10"
            >
                <Input
                    type="name"
                    register={register("name", {
                        required: "이름은 필수입니다.",
                        minLength: {
                            value: 2,
                            message: "이름은 2글자 이상이어야 합니다."
                        },
                        value: name
                    })}
                    required
                    error={errors.name?.message}
                    defaultValue={name}
                />
                <Input
                    disabled={true}
                    type="email"
                    defaultValue={email}
                />
                <Input
                    type="githubURL"
                    register={register("githubURL", {
                        maxLength: {
                            value: 70,
                            message: "링크는 70자 이내여야 합니다."
                        },
                        validate: {
                            githubURLFormat: (value: any): boolean | string => {
                                return value?.length === 0 ? true : (
                                    value?.includes("https://github.com/") ? true : "깃허브 링크 형식을 확인해주세요."
                                )
                            }
                        },
                        value: githubURL
                    })}
                    error={errors.githubURL?.message}
                    placeholder="https://github.com/sopaisthebest"
                    defaultValue={githubURL}
                />

                {socialLogin ? null : (
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
                            required
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
                            required
                            error={errors.password2?.message}
                        />
                    </>
                )}

                <FormButton
                    text={`${name}의 프로필 수정`}
                    loading={loading}
                />
            </form>
        </>
    );
};