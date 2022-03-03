/**
 * 생성일: 2022.02.15
 * 수정일: 2022.03.03
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client';
import FormButton from '@components/form/FormButton';
import Input from '@components/form/Input';
import PositionSelector from '@components/form/PositionSelector';
import { selectedSkillsToUploadState, postsState } from '@utils/atoms';
import { IPostDisplay } from '@utils/types/interfaces';
import useMyInfo from 'hooks/useMyInfo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

interface IForm {
    title: string;
    description?: string;
    openChatLink?: string;
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($title:String!,$skills:String!,$description:String,$openChatLink:String){
        createPost(title:$title,skills:$skills,description:$description,openChatLink:$openChatLink){
            id
            title
        }
    }
`

export default function CreatePost() {
    const router = useRouter()
    const selectedSkillsToUpload = useRecoilValue(selectedSkillsToUploadState);
    const resetSelectedSkillsToUpload = useResetRecoilState(selectedSkillsToUploadState)
    const setPosts = useSetRecoilState(postsState)
    const { seeMyInfo } = useMyInfo();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<IForm>();

    const updateCreatePost: MutationUpdaterFn = (cache, { data }) => {
        const { createPost }: any = data
        if (createPost.id) {
            cache.modify({
                id: `ROOT_QUERY`,
                fields: {
                    seePosts(prev: IPostDisplay[]) {
                        return [createPost, ...prev]
                    }
                }
            });
            cache.modify({
                id: `User:${seeMyInfo?.id}`,
                fields: {
                    postCount(prev) {
                        return prev + 1
                    }
                }
            });
            cache.modify({
                id: `ROOT_QUERY`,
                fields: {
                    seeMyPosts(prev) {
                        return [createPost, ...prev]
                    }
                }
            })

            setPosts(prev => {
                return [
                    createPost,
                    ...prev
                ]
            })
            resetSelectedSkillsToUpload();
            router.push("/");
        }
    }

    const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
        update: updateCreatePost
    })

    const onValid = ({ title, description, openChatLink }: IForm) => {
        if (loading) return;
        if (selectedSkillsToUpload.length === 0) {
            alert("스킬을 하나 이상 선택해주세요!");
            return;
        }
        const skills = selectedSkillsToUpload.map(skill => {
            const { isSelected, skillImage, ...skillInfo } = skill
            return skillInfo
        })

        createPost({
            variables: {
                title,
                skills: JSON.stringify(skills),
                description,
                openChatLink
            }
        })
    }

    useEffect(() => {
        resetSelectedSkillsToUpload();
    }, [])
    return (
        <form
            className={`
                space-y-10
            `}
            onSubmit={handleSubmit(onValid)}
        >
            <Input
                type="title"
                register={register("title", {
                    required: "제목은 필수입니다.",
                    minLength: {
                        value: 2,
                        message: "제목은 2글자 이상이어야 합니다."
                    },
                    maxLength: {
                        value: 32,
                        message: "제목은 32글자 이하여야 합니다."
                    }
                })}
                error={errors.title?.message}
                required
                maxLength={32}
            />

            <PositionSelector />

            <Input
                type="description"
                register={register("description")}
                placeholder="설명을 입력하세요."
                maxLength={1000}
            />

            <Input
                type="openChatLink"
                register={register("openChatLink", {
                    maxLength: {
                        value: 70,
                        message: "링크는 70자 이내여야 합니다."
                    },
                    validate: {
                        checkKakao: (value: any): boolean | string => {
                            return value.length === 0 ? true : (
                                value?.includes("https://open.kakao.com/") ? true : "카카오 오픈채팅 형식을 확인해주세요."
                            )
                        }
                    }
                })}
                placeholder="https://open.kakao.com/o/sopaisthebest"
                error={errors.openChatLink?.message}
                maxLength={70}
            />

            <FormButton
                disabled={loading || !watch("title") || selectedSkillsToUpload.length === 0}
                loading={loading}
                text="게시글 업로드"
            />
        </form>
    )
}