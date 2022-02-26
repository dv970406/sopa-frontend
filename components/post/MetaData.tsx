/**
 * 생성일: 2022.02.18
 * 수정일: 2022.02.26
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client'
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

    const afterToggleLike: MutationUpdaterFn = (cache, { data }) => {
        const { toggleLike: { ok, error } }: any = data;
        if (!ok) {
            alert(error);
            return;
        }

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
        })
        cache.modify({
            id: `User:${seeMyInfo?.id}`,
            fields: {
                likeCount(prev) {
                    return isLiked ? prev - 1 : prev + 1
                }
            }
        })

        cache.modify({
            id: `ROOT_QUERY`,
            fields: {
                seeMyLikes(prev) {
                    const findPost = prev.find((like: any) => like.post.__ref === `Post:${postId}`);
                    const write = cache.extract()[`Post:${postId}`]
                    return isLiked ? prev.filter((like: any) => like !== findPost) : [write, ...prev]
                }
            }
        })

    };

    const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
        update: afterToggleLike,
        variables: {
            postId
        }
    })

    return (
        <div
            className={`
                flex
                space-x-3
                justify-end
            `}
        >
            <div
                className={`
                    flex flex-col items-center
                `}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className={`
                        w-7 h-7 text-fuchsia-500
                    `}
                >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span>{readCount}</span>
            </div>

            <div
                className={`
                    flex flex-col items-center
                `}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className={`
                        w-7 h-7 text-fuchsia-500
                    `}
                >
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <span>{commentCount}</span>
            </div>

            <div
                className={`
                    flex flex-col items-center
                `}
                onClick={() => toggleLike()}
            >
                {isSeePost ? (
                    isLiked ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            className={`
                                w-7 h-7 cursor-pointer text-fuchsia-500 hover:scale-110 transition-all
                            `}
                        >
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            className={`
                                w-7 h-7 cursor-pointer hover:scale-110 transition-all
                                stroke-fuchsia-500 stroke-1 hover:stroke-[1.5px]
                            `}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    )
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        className={`
                            w-7 h-7 text-red-500
                        `}
                    >
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                )}
                <span>
                    {likeCount}
                </span>
            </div>
        </div>
    )
}