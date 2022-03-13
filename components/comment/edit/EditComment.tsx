/**
 * 생성일: 2022.02.20
 * 수정일: 2022.03.13
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client';
import { IMutationResults } from '@utils/types/interfaces';
import React from 'react';
import { useForm } from 'react-hook-form';

interface IEditCommentForm {
    editedComment: string;
};
interface IEditCommentComponent {
    setEditCommentMode(current: boolean): void;
    postId: number;
    comment: string;
    commentId: number;
};

const EDIT_COMMENT_MUTATION = gql`
    mutation editComment($commentId:Int!,$comment:String!){
        editComment(commentId:$commentId,comment:$comment){
            ok
            error
        }
    }
`;

export default function EditComment({ setEditCommentMode, comment, commentId }: IEditCommentComponent) {
    const { register, handleSubmit, getValues } = useForm<IEditCommentForm>();

    // editComment Mutation 처리 후 cache 수정작업
    const updateEditComment: MutationUpdaterFn = (cache, { data }) => {
        const { editComment: { ok, error } }: any = data;

        // Mutation 처리 실패한 경우 alert를 띄우고 return
        if (!ok) {
            alert(error);
            return;
        };

        const { editedComment } = getValues();

        // 해당 comment의 내용을 react-hook-form에 입력한대로 수정
        cache.modify({
            id: `Comment:${commentId}`,
            fields: {
                comment() {
                    return editedComment
                }
            }
        });

        // cache처리가 끝나면 편집모드 종료
        setEditCommentMode(false);
    };

    const [editCommentMutation, { loading }] = useMutation<IMutationResults>(EDIT_COMMENT_MUTATION, {
        update: updateEditComment
    });

    // form이 제출되었을 때 실행
    const onValid = ({ editedComment }: IEditCommentForm) => {
        if (loading) return;

        editCommentMutation({
            variables: {
                commentId,
                comment: editedComment
            }
        });
    };
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
                className="
                    rounded-md 
                    w-full px-3 py-2
                    bg-fuchsia-100 
                    dark:bg-dark-default 
                    focus:outline-none 
                "
            />
        </form>
    );
};

