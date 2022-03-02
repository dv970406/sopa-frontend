/**
 * 생성일: 2022.02.20
 * 수정일: 2022.03.02
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client';
import Button from '@components/shared/Button';
import { COMMENT_FRAGMENT } from '@utils/fragments';
import useMyInfo from 'hooks/useMyInfo';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($postId:Int!,$comment:String!){
        createComment(postId:$postId,comment:$comment){
            ...CommentFragment
        }
    }
    ${COMMENT_FRAGMENT}
`;

interface IForm {
    comment: string;
}

interface ICreateCommentComponent {
    postId: number;
}

export default function CreateComment({ postId }: ICreateCommentComponent) {
    const [checkTextCount, setCheckTextCount] = useState(0);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const { seeMyInfo } = useMyInfo();

    const changeTextCount = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCheckTextCount(+event.currentTarget.value.length)
    }

    const updateCreateComment: MutationUpdaterFn = (cache, { data }) => {
        const { createComment }: any = data
        if (!createComment.id) {
            alert("잘못된 접근입니다.");
            return;
        };

        /* 
            writeFragment 작성 후 Post의 comment cache에 추가해주어야 Comment:id의 형태로 __ref로써 참고하게 되더라.
            writeFragment 없이 단순 modify만 한 경우 createComment를 하고 새로고침하고 editComment하면 문제는 없으나 createComment를 한 후 새로고침 없이 바로 editComment를 하려고 하면
            __ref로 참고하는 것이 아니라 Post의 comments cache 배열과 내가 수정하는 comment가 따로 놀아서 반영되지 않더라
        */
        const newComment = cache.writeFragment({
            id: `Comment:${createComment.id}`,
            fragment: gql`
                fragment dsa on Comment{
                    id
                    comment
                    user{
                        id
                        name
                    }
                }
            `,
            data: {
                ...createComment
            }
        })

        cache.modify({
            id: `Post:${postId}`,
            fields: {
                commentCount(prev) {
                    return prev + 1
                },
                comments(prev) {
                    return [newComment, ...prev]
                }
            }
        });

        cache.modify({
            id: `User:${seeMyInfo?.id}`,
            fields: {
                commentCount(prev) {
                    return prev + 1
                }
            }
        });
        cache.modify({
            id: `ROOT_QUERY`,
            fields: {
                seeMyComments(prev) {
                    return [newComment, ...prev]
                }
            }
        })

        setValue("comment", "");
    }

    const [createCommentMutation, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
        update: updateCreateComment
    })

    const onValid = ({ comment }: IForm) => {
        if (loading) return;

        createCommentMutation({
            variables: {
                postId,
                comment
            }
        })
    }
    return (
        <div
            className='space-y-4'
        >
            <h1 className="font-bold text-lg">
                댓글을 입력하세요.
            </h1>
            <form
                onSubmit={handleSubmit(onValid)}
                className={`
                    flex flex-col
                    w-full border-2 border-sopa-default rounded-lg p-4 transition: ;
                    focus-within:border-[2.5px] focus-within:border-sopa-accent
                `}
            >
                <textarea
                    {...register("comment", {
                        required: true,
                        maxLength: {
                            value: 200,
                            message: "200글자 미만이어야 합니다."
                        }
                    })}
                    className={`
                        focus:outline-none
                    `}
                    rows={5}
                    cols={50}
                    placeholder="댓글을 입력하세요"
                    maxLength={200}
                    onChange={changeTextCount}
                    required
                >
                </textarea>
                <div
                    className={`
                        w-full
                        border-t-2 border-t-sopa-default
                        flex items-center
                        space-x-2
                        pt-2 mt-2
                        place-content-end
                    `}
                >
                    <p className='font-bold'>{checkTextCount} / 200</p>
                    <Button text="추가" />
                </div>
            </form>
        </div>

    )
}