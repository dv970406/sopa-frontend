/**
 * 생성일: 2022.02.18
 * 수정일: 2022.03.06
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client';
import { IMutationResults } from '@utils/types/interfaces';
import useMyInfo from 'hooks/useMyInfo';
import React from 'react';

interface IMetaData {
    isSeePost?: boolean;
    postId: number;
    readCount: number;
    commentCount: number;
    likeCount: number;
    isLiked: boolean;
};

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($postId:Int!){
        toggleLike(postId:$postId){
            ok
            error
        }
    }
`;

export default function MetaData({ isSeePost = false, postId, readCount, commentCount, likeCount, isLiked }: IMetaData) {
    const { seeMyInfo } = useMyInfo();

    // toggleLike Mutation 처리 후 cache 수정 작업
    const afterToggleLike: MutationUpdaterFn = (cache, { data }) => {
        const { toggleLike: { ok, error } }: any = data;
        if (!ok) {
            alert(error);
            return;
        };

        // 해당 게시글에 대한 관심 추가, 삭제 반영
        cache.modify({
            id: `Post:${postId}`,
            fields: {
                isLiked(prev) {
                    return !prev
                },
                likeCount(prev) {
                    return isLiked ? prev - 1 : prev + 1
                },
            }
        });

        // user가 관심 count 조작
        cache.modify({
            id: `User:${seeMyInfo?.id}`,
            fields: {
                likeCount(prev) {
                    return isLiked ? prev - 1 : prev + 1
                }
            }
        });

        // seeMyLikes query cache에서 추가, 삭제 반영
        cache.modify({
            id: `ROOT_QUERY`,
            fields: {
                seeMyLikes(prev) {
                    const findPost = prev.find((like: any) => like?.post?.__ref === `Post:${postId}`);
                    return isLiked ? prev.filter((like: any) => like !== findPost) : [...prev];
                }
            }
        });
    };

    const [toggleLike, { loading }] = useMutation<IMutationResults>(TOGGLE_LIKE_MUTATION, {
        update: afterToggleLike,
        variables: {
            postId
        }
    })

    const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (loading) return;
        toggleLike();
    }

    return (
        <div
            className="
                flex justify-end
                space-x-3
            "
        >
            <button
                className="
                    flex flex-col items-center
                "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className="
                        w-7 h-7 
                        text-sopa-accent
                    "
                >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span className='font-bold'>{readCount}</span>
            </button>

            <button
                className="
                    flex flex-col items-center
                "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className="
                        w-7 h-7 
                        text-sopa-accent
                    "
                >
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <span className='font-bold'>{commentCount}</span>
            </button>

            <button
                className="
                    flex flex-col items-center
                "
                onClick={onClick}
            >
                {isLiked ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        className="
                                w-7 h-7
                                text-sopa-accent 
                                hover:scale-110 
                                transition-all cursor-pointer 
                            "
                    >
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        className="
                                w-7 h-7
                                stroke-sopa-accent stroke-1 hover:stroke-[1.5px]
                                hover:scale-110 
                                cursor-pointer transition-all
                            "
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                )}
                <span className='font-bold'>{likeCount}</span>
            </button>
        </div>
    );
};