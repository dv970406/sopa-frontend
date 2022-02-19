/**
 * 생성일: 2022.02.19
 * 수정일: ------
 */

import { ICommentInfo } from '@utils/types/interfaces';

export default function CommentDisplay({ id, comment, user }: ICommentInfo) {
    return (
        <div>
            {id}
        </div>
    )
}