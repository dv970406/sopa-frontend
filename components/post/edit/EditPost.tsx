/**
 * 생성일: 2022.02.21
 * 수정일: ------
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client';
import FormButton from '@components/form/FormButton';
import Input from '@components/form/Input';
import Button from '@components/shared/Button';
import { postEditMode } from '@utils/atoms';
import { IFetchedSkillsInfo } from '@utils/types/interfaces';
import { useForm } from 'react-hook-form'
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import SkillImage from '../SkillImage';

interface IEditPostComponent {
    postId: number;
    title: string;
    description?: string;
    openChatLink?: string;
    frontends: IFetchedSkillsInfo[];
    backends: IFetchedSkillsInfo[];
    apps: IFetchedSkillsInfo[];
}

interface IForm {
    editedTitle: string;
    editedDescription?: string;
    editedOpenChatLink?: string;
}

const EDIT_POST_MUTATION = gql`
    mutation editPost($postId:Int!,$title:String!,$description:String,$openChatLink:String){
        editPost(postId:$postId,title:$title,description:$description,openChatLink:$openChatLink){
            ok
            error
        }
    }
`

export default function EditPost({ postId, title, description, openChatLink, apps, backends, frontends }: IEditPostComponent) {
    const setIsPostEditMode = useSetRecoilState(postEditMode);
    const resetIsPostEditMode = useResetRecoilState(postEditMode);

    const { register, handleSubmit, watch, getValues } = useForm<IForm>();

    const updateEditPost: MutationUpdaterFn = (cache, { data }) => {
        const { editPost: { ok, error } }: any = data;

        if (!ok) {
            alert(error);
            return;
        };
        const {
            editedTitle,
            editedDescription,
            editedOpenChatLink
        } = getValues();

        cache.modify({
            id: `Post:${postId}`,
            fields: {
                title() {
                    return editedTitle
                },
                description() {
                    return editedDescription
                },
                openChatLink() {
                    return editedOpenChatLink
                }
            }
        });
        setIsPostEditMode(false);
    }

    const [editPostMutation, { loading }] = useMutation(EDIT_POST_MUTATION, {
        update: updateEditPost
    })

    const onValid = ({ editedTitle, editedDescription, editedOpenChatLink }: IForm) => {
        if (loading) return;

        editPostMutation({
            variables: {
                postId,
                ...(editedTitle && { title: editedTitle }),
                ...(editedDescription && { description: editedDescription }),
                ...(editedOpenChatLink && { openChatLink: editedOpenChatLink }),
            }
        })
    };

    return (
        <form
            className={`
                space-y-10
            `}
            onSubmit={handleSubmit(onValid)}
        >
            <Button
                text="수정 취소"
                onClick={resetIsPostEditMode}
            />
            <Input
                type="title"
                register={register("editedTitle", {
                    required: true,
                    minLength: {
                        value: 2,
                        message: "제목은 2글자 이상이어야 합니다."
                    }
                })}
                maxLength={32}
                defaultValue={title}
                required
            />

            <div>
                <h1>
                    스킬
                    <span
                        className={`
                            ml-1 text-fuchsia-400 font-bold
                        `}
                    >
                        (수정 불가)
                    </span>
                </h1>
                <div
                    className={`
                        mt-4 flex space-x-5 flex-wrap justify-center items-center
                    `}
                >
                    <SkillImage
                        frontends={frontends || !watch("editedTitle")}
                        backends={backends}
                        apps={apps}
                    />
                </div>
            </div>

            <Input
                type="description"
                register={register("editedDescription")}
                placeholder="설명을 입력하세요."
                maxLength={600}
                defaultValue={description}
            />

            <Input
                type="link"
                register={register("editedOpenChatLink", {
                    maxLength: {
                        value: 70,
                        message: "링크는 70자 이내여야 합니다."
                    },
                    validate: {
                        checkKakao: (value: any) => {
                            return value.length === 0 ? true : (
                                value?.includes("https://open.kakao.com/") ? true : "카카오 오픈채팅 형식을 확인해주세요."
                            )
                        }
                    }
                })}
                placeholder="https://open.kakao.com/o/sopaisthebest"
                maxLength={70}
                defaultValue={openChatLink}
            />

            <FormButton
                disabled={loading}
                loading={loading}
                text={`게시물 수정`}
            />
        </form>
    )
}