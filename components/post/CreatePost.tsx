/**
 * 생성일: 2022.02.15
 * 수정일: ------
 */

import { gql, useMutation } from '@apollo/client';
import FormButton from '@components/form/FormButton';
import Input from '@components/form/Input';
import PositionSelector from '@components/form/PositionSelector';
import { IMutationResults } from '@utils/apollo';
import { selectedSkillsState } from '@utils/atoms';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

interface IForm {
    title: string;
    description?: string;
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($title:String!,$skills:String!,$description:String){
        createPost(title:$title,skills:$skills,description:$description){
            ok
            error
        }
    }
`


export default function CreatePost() {
    const router = useRouter()
    const selectedSkills = useRecoilValue(selectedSkillsState);

    const { register, handleSubmit } = useForm<IForm>();

    const createPostCompleted = ({ createPost }: IMutationResults) => {
        const { ok, error } = createPost
        if (!ok) {
            alert(error);
            return;
        };
        router.push("/");
    }
    const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
        onCompleted: createPostCompleted
    })

    const onValid = ({ title, description }: IForm) => {
        if (loading) return;
        const skills = selectedSkills.map(skill => {
            const { isSelected, skillImage, ...skillInfo } = skill
            return skillInfo
        })
        console.log(skills)
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