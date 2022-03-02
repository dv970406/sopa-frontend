/**
 * 생성일: 2022.02.20
 * 수정일: 2022.03.02
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client';
import { IMutationResults } from '@utils/types/interfaces';
import React from 'react';
import { useForm } from 'react-hook-form';

interface IEditCommentForm {
    editedComment: string;
}
interface IEditCommentComponent {
    setEditCommentMode(current: boolean): void;
    postId: number;
    comment: string;
    commentId: number;
}

const EDIT_COMMENT_MUTATION = gql`
    mutation editComment($commentId:Int!,$comment:String!){
        editComment(commentId:$commentId,comment:$comment){
            ok
            error
        }
    }
`
export default function EditComment({ setEditCommentMode, comment, commentId }: IEditCommentComponent) {
    const { register, handleSubmit, getValues } = useForm<IEditCommentForm>();
    const updateEditComment: MutationUpdaterFn = (cache, { data }) => {
        const { editComment: { ok, error } }: any = data;
        if (!ok) {
            alert(error);
            return;
        };

        const { editedComment } = getValues();

        cache.modify({
            id: `Comment:${commentId}`,
            fields: {
                comment() {
                    return editedComment
                }
            }
        })
        setEditCommentMode(false);
    }
    const [editCommentMutation, { loading }] = useMutation<IMutationResults>(EDIT_COMMENT_MUTATION, {
        update: updateEditComment
    })

    const onValid = ({ editedComment }: IEditCommentForm) => {
        if (loading) return;

        editCommentMutation({
            variables: {
                commentId,
                comment: editedComment
            }
        })
    }
    return (
        <form
            onSubmit={handleSubmit(onValid)}
        >
            <input
                {...register("editedComment", {
                    required: true,
                    maxLength: {
                        value: 200,
                        message: "200글자 이상이어야 합니다."
                    }
                })}
                type="text"
                defaultValue={comment}
                maxLength={200}
                autoFocus={true}
                className={`
                    w-full
                    focus:outline-none bg-fuchsia-100 rounded-md px-3 py-2
                `}
            />
        </form>
    )
}

