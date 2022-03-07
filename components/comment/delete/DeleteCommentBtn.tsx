/**
 * 생성일: 2022.02.20
 * 수정일: 2022.03.05
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client';
import { IMutationResults } from '@utils/types/interfaces';
import useMyInfo from 'hooks/useMyInfo';

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($commentId:Int!){
        deleteComment(commentId:$commentId){
            ok
            error
        }
    }
`;
interface IDeleteCommentComponent {
    postId: number;
    commentId: number;
};

export default function DeleteCommentBtn({ postId, commentId }: IDeleteCommentComponent) {
    const { seeMyInfo } = useMyInfo();

    // deleteComment Mutation 처리 후 cache 수정작업
    const updateDeleteComment: MutationUpdaterFn = (cache, { data }) => {
        const { deleteComment: { ok, error } }: any = data;

        // Mutation 처리 실패한 경우 alert를 띄우고 return
        if (!ok) {
            alert(error);
            return;
        };

        // cache에서 comment 삭제
        cache.evict({
            id: `Comment:${commentId}`
        });

        // 해당 comment가 속한 post의 commentCount를 -1
        cache.modify({
            id: `Post:${postId}`,
            fields: {
                commentCount(prev) {
                    return prev - 1
                }
            }
        });

        // 해당 comment를 단 user의 commentCount를 -1
        cache.modify({
            id: `User:${seeMyInfo?.id}`,
            fields: {
                commentCount(prev) {
                    return prev - 1
                }
            }
        });
    };

    const [deleteCommentMutation, { loading }] = useMutation<IMutationResults>(DELETE_COMMENT_MUTATION, {
        variables: {
            commentId
        },
        update: updateDeleteComment
    });

    const onClick = () => {
        if (loading) return;
        deleteCommentMutation();
    }

    return (
        <button
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                className="
                    h-6 w-6 cursor-pointer
                    text-sopa-pure
                    hover:text-sopa-accent
                    transition
                "
            >
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        </button>
    )
}