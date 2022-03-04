/**
 * 생성일: 2022.02.15
 * 수정일: 2022.03.04
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client';
import FormButton from '@components/form/FormButton';
import Input from '@components/form/Input';
import UploadSkillsSelector from '@components/form/UploadSkillsSelector';
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

    const { register, handleSubmit, formState: { errors } } = useForm<IForm>();

    // createPost Mutation 처리 후 cache 수정작업
    const updateCreatePost: MutationUpdaterFn = (cache, { data }) => {
        const { createPost }: any = data
        if (createPost.id) {
            // Mutation 처리 후 cache에 추가 
            cache.modify({
                id: `ROOT_QUERY`,
                fields: {
                    seePosts(prev: IPostDisplay[]) {
                        return [createPost, ...prev]
                    }
                }
            });

            // user가 가진 post의 개수 +1
            cache.modify({
                id: `User:${seeMyInfo?.id}`,
                fields: {
                    postCount(prev) {
                        return prev + 1
                    }
                }
            });

            // seeMyPosts query cache에도 해당 post를 추가한다.
            cache.modify({
                id: `ROOT_QUERY`,
                fields: {
                    seeMyPosts(prev) {
                        return [createPost, ...prev]
                    }
                }
            })

            // 그리고 postsState에 추가하여 리렌더링
            setPosts(prev => {
                return [
                    createPost,
                    ...prev
                ]
            })

            // 업로드 후 CreatePost창에서 셀렉했던 skill들을 reset하고 index페이지로 돌려보낸다.
            resetSelectedSkillsToUpload();
            router.push("/");
        }
    }

    const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
        update: updateCreatePost
    })

    // form이 제출되면 셀렉한 스킬이 있는지 확인하고 mutation 실행
    const onValid = ({ title, description, openChatLink }: IForm) => {
        if (loading) return;
        if (selectedSkillsToUpload?.length === 0) {
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

    // 컴포넌트가 렌더링될 때 마다 셀렉 스킬 리셋
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

            <UploadSkillsSelector />

            <Input
                type="description"
                register={register("description")}
                placeholder="설명을 입력하세요."
                maxLength={600}
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
                            return value?.length === 0 ? true : (
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
                loading={loading}
                text="게시글 업로드"
            />
        </form>
    )
}