/**
 * 생성일: 2022.02.21
 * 수정일: 2022.03.05
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client';
import { IMutationResults } from '@utils/types/interfaces';
import useMyInfo from 'hooks/useMyInfo';
import { useRouter } from 'next/router';

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId:Int!){
        deletePost(postId:$postId){
            ok
            error
        }
    }
`;

interface IDeletePostComponent {
    postId: number;
};

export default function DeletePost({ postId }: IDeletePostComponent) {
    const router = useRouter();
    const { seeMyInfo } = useMyInfo();

    // deletePost Mutation 처리 후 cache 수정작업
    const updateDeletePost: MutationUpdaterFn = (cache, { data }) => {
        const { deletePost: { ok, error } }: any = data
        if (!ok) {
            alert(error);
            return;
        };

        // 해당 post를 cache에서 제거
        cache.evict({
            id: `Post:${postId}`
        });

        // user가 가진 post 개수를 -1
        cache.modify({
            id: `User:${seeMyInfo?.id}`,
            fields: {
                postCount(prev) {
                    return prev - 1
                }
            }
        });

        // 삭제 후 이전 페이지로 못돌아 가도록 replace로 설정
        router.replace("/");
    };

    const [deletePostMutation, { loading }] = useMutation<IMutationResults>(DELETE_POST_MUTATION, {
        variables: {
            postId
        },
        update: updateDeletePost
    });

    const onClick = () => {
        if (loading) return;
        deletePostMutation();
    };
    return (
        <button
            onClick={onClick}
            className="p-1"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                className="
                    h-5 w-5
                    text-emphasize hover:scale-110
                    transition
                "
            >
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        </button>
    );
};