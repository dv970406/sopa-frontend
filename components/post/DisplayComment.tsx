/**
 * 생성일: 2022.02.19
 * 수정일: 2022.02.20
 */

import { editCommentIdState } from '@utils/atoms';
import { ICommentInfo } from '@utils/types/interfaces';
import useMyInfo from 'hooks/useMyInfo';
import React from 'react';
import { useRecoilValue } from 'recoil';
import DeleteCommentBtn from './DeleteCommentBtn';
import EditComment from './EditComment';
import EditCommentBtn from './EditCommentBtn';

export default function DisplayComment({ postId, id, comment, user }: ICommentInfo) {
    const editCommentId = useRecoilValue(editCommentIdState);

    const { seeMyProfile } = useMyInfo();
    console.log(editCommentId)
    return (
        <div
            className={`
                p-2
                border-b-2 border-b-fuchsia-200
                space-y-2
            `}
        >
            <div
                className={`
                    flex justify-between
                `}
            >
                <h1
                    className={`
                        font-bold
                    `}
                >
                    {user.name}
                </h1>
                {seeMyProfile?.id === user.id ? (
                    <div
                        className={`
                            lex space-x-3
                        `}
                    >
                        <EditCommentBtn commentId={id} />
                        <DeleteCommentBtn postId={postId!} commentId={id} />
                    </div>
                ) : null}
            </div>
            <div>
                {id === editCommentId ? (
                    <EditComment postId={postId!} comment={comment} commentId={id} />
                ) : comment}
            </div>
        </div>
    )
}