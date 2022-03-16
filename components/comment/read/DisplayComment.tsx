/**
 * 생성일: 2022.02.19
 * 수정일: 2022.03.16
 */

import type { ICommentInfo } from '@utils/types/interfaces';
import { getCreatedDate } from '@utils/utilFunctions';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import DeleteCommentBtn from '../delete/DeleteCommentBtn';
import EditCommentBtn from '../edit/EditCommentBtn';

function DisplayComment({ postId, id, comment, user, isMine, createdAt }: ICommentInfo) {
    // 전역관리 recoil을 사용하니까 메모이징을 해도 전역적으로 state가 바뀌어서 리렌더가 불필요한 컴포넌트도 리렌더링되므로 그냥 지역관리 state를 사용한다.
    const [editCommentMode, setEditCommentMode] = useState<boolean>(false);

    // 버튼 클릭 여부에 따라 분기처리 되었으므로 다이나믹 임포트로 최적화
    const EditComment = dynamic(() => import("../edit/EditComment"));

    return (
        <div
            className="
                w-full
                border-b-2 border-b-sopa-soft
            "
        >
            <div
                className="
                    flex justify-between
                "
            >
                <div
                    className="
                        font-bold text-lg
                    "
                >
                    {user?.name}
                    <p
                        className="font-bold text-xs"
                    >
                        {getCreatedDate(+createdAt)}
                    </p>
                </div>
                {isMine ? (
                    <div
                        className="
                            flex space-x-3
                        "
                    >
                        <EditCommentBtn setEditCommentMode={setEditCommentMode} />
                        <DeleteCommentBtn postId={postId!} commentId={id} />
                    </div>
                ) : null}
            </div>
            <div
                className="text-base p-2"
            >
                {editCommentMode ? (
                    <EditComment setEditCommentMode={setEditCommentMode} postId={postId!} comment={comment} commentId={id} />
                ) : comment}
            </div>
        </div>
    );
};

export default React.memo(DisplayComment);