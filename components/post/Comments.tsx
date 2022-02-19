/**
 * 생성일: 2022.02.19
 * 수정일: ------
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client';
import { COMMENT_FRAGMENT } from '@utils/fragments';
import React, { useState } from 'react'
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
interface ICommentsComponent {
    postId: number;
}

export default function Comments({ postId }: ICommentsComponent) {
    const [checkTextCount, setCheckTextCount] = useState(0);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCheckTextCount(+event.currentTarget.value.length)
    }
    console.log(typeof postId)
    const updateCreateComment: MutationUpdaterFn = (cache, { data }) => {
        const { createComment }: any = data
        if (!createComment.id) {
            alert("잘못된 접근입니다.");
            return;
        };
        cache.modify({
            id: `Post:${postId}`,
            fields: {
                commentCount(prev) {
                    return prev + 1
                },
                comments(prev) {
                    return [createComment, ...prev]
                }
            }
        });
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
            className={`
                border-t-2 border-t-fuchsia-400
            `}
        >
            <h1
                className={`
                    mt-2
                `}
            >
                Comment
            </h1>
            <form
                onSubmit={handleSubmit(onValid)}
                className={`
                    flex flex-col
                    w-full border-2 border-fuchsia-200 rounded-lg p-2 transition
                    focus-within:border-fuchsia-400
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
                    onChange={onChange}
                    required
                >
                </textarea>
                <div
                    className={`
                        w-full
                        border-t-2 border-t-fuchsia-400
                        flex items-center
                        space-x-2
                        pt-2 mt-2
                        place-content-end
                    `}
                >
                    <p>{checkTextCount} / 200</p>
                    <button
                        className={`
                            px-5 py-2 bg-fuchsia-400 opacity-60
                            hover:opacity-100 rounded-lg transition
                            
                        `}
                    >
                        추가
                    </button>
                </div>
            </form>
        </div>

    )
}