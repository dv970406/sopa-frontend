/**
 * 생성일: 2022.02.15
 * 수정일: ------
 */

import { gql, useMutation } from '@apollo/client';
import FormButton from '@components/form/FormButton';
import Input from '@components/form/Input';
import PositionSelector from '@components/form/PositionSelector';
import { selectedSkillsToUploadState, postsState } from '@utils/atoms';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

interface IForm {
    title: string;
    description?: string;
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($title:String!,$skills:String!,$description:String){
        createPost(title:$title,skills:$skills,description:$description){
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

    const { register, handleSubmit } = useForm<IForm>();

    const updateCreatePost = (cache: { modify: (arg0: { id: string; fields: any; }) => void; }, { data }: any) => {
        const { createPost } = data
        if (createPost.id) {
            cache.modify({
                id: `ROOT_QUERY`,
                fields: {
                    seePosts(prev: any) {
                        return [createPost, ...prev]
                    }
                }
            })
            console.log("createPost : ", createPost)
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

    const onValid = ({ title, description }: IForm) => {
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
                description
            }
        })
    }
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
                    required: true,
                    minLength: {
                        value: 2,
                        message: "제목은 2글자 이상이어야 합니다."
                    }
                })}
            />

            <PositionSelector />

            <Input
                type="description"
                register={register("description")}
            />

            <FormButton loading={loading} text="게시글 업로드" />
        </form>
    )
}