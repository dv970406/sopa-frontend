/**
 * 생성일: 2022.02.20
 * 수정일: 2022.02.26
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client';
import useMyInfo from 'hooks/useMyInfo';


const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($commentId:Int!){
        deleteComment(commentId:$commentId){
            ok
            error
        }
    }
`
interface IDeleteCommentComponent {
    postId: number;
    commentId: number;
}

export default function DeleteCommentBtn({ postId, commentId }: IDeleteCommentComponent) {
    const { seeMyInfo } = useMyInfo();

    const updateDeleteComment: MutationUpdaterFn = (cache, { data }) => {
        const { deleteComment: { ok, error } }: any = data;
        if (!ok) {
            alert(error);
            return;
        };
        cache.evict({
            id: `Comment:${commentId}`
        });
        cache.modify({
            id: `Post:${postId}`,
            fields: {
                commentCount(prev) {
                    return prev - 1
                }
            }
        })
        cache.modify({
            id: `User:${seeMyInfo?.id}`,
            fields: {
                commentCount(prev) {
                    return prev - 1
                }
            }
        })
    }
    const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: {
            commentId
        },
        update: updateDeleteComment
    })
    return (
        <button
            onClick={() => deleteCommentMutation()}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                className={`
                    h-6 w-6 text-fuchsia-300 hover:text-fuchsia-500 cursor-pointer transition
                `}
            >
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        </button>
    )
}