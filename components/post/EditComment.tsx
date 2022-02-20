/**
 * 생성일: 2022.02.20
 * 수정일: ------
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client';
import { editCommentIdState } from '@utils/atoms';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

interface IEditCommentForm {
    editedComment: string;
}
interface IEditCommentComponent {
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
export default function EditComment({ postId, comment, commentId }: IEditCommentComponent) {
    const setEditCommentId = useSetRecoilState(editCommentIdState);
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
        setEditCommentId(0);
    }
    const [editCommentMutation, { loading }] = useMutation(EDIT_COMMENT_MUTATION, {
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

