/**
 * 생성일: 2022.02.19
 * 수정일: 2022.02.20
 */

import { ICommentInfo } from '@utils/types/interfaces';
import useMyInfo from 'hooks/useMyInfo';
import React, { useState } from 'react';
import DeleteCommentBtn from './DeleteCommentBtn';
import EditComment from './EditComment';
import EditCommentBtn from './EditCommentBtn';

function DisplayComment({ postId, id, comment, user }: ICommentInfo) {
    // 전역관리 recoil을 사용하니까 메모이징을 해도 전역적으로 state가 바뀌어서 리렌더가 불필요한 컴포넌트도 리렌더링되므로 그냥 지역관리 state를 사용한다.
    const [editMode, setEditMode] = useState<boolean>(false);

    const { seeMyProfile } = useMyInfo();

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
                            flex space-x-3
                        `}
                    >
                        <EditCommentBtn setEditMode={setEditMode} />
                        <DeleteCommentBtn postId={postId!} commentId={id} />
                    </div>
                ) : null}
            </div>
            <div>
                {editMode ? (
                    <EditComment setEditMode={setEditMode} postId={postId!} comment={comment} commentId={id} />
                ) : comment}
            </div>
        </div>
    )
}

export default React.memo(DisplayComment)