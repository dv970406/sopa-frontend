/**
 * 생성일: 2022.02.18
 * 수정일: 2022.03.13
 */

import type { ICommentInfo, IPostDetailInfo } from '@utils/types/interfaces';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { postEditModeState } from '@utils/atoms';
import { useEffect } from 'react';
import SeePostDetail from './SeePostDetail';
import { ApolloQueryResult } from '@apollo/client';
import dynamic from 'next/dynamic';

interface IPostDetailInfoComponent {
    postTitle: string;
    seePost: IPostDetailInfo;
    fetchMore: () => Promise<ApolloQueryResult<unknown>>;
    comments: ICommentInfo[];
};


export default function SeePost({ fetchMore, postTitle, seePost, comments }: IPostDetailInfoComponent) {
    const postEditMode = useRecoilValue(postEditModeState);
    const resetPostEditMode = useResetRecoilState(postEditModeState);

    // 분기처리된 EditPost를 다이나믹 임포트로 최적화
    const EditPost = dynamic(() => import("../edit/EditPost"));

    useEffect(() => {
        resetPostEditMode();
    }, [resetPostEditMode]);

    // postEditMode로 분기처리하여 edit모드인지 Detail모드인지 나눈다.
    return (
        postEditMode ? (
            <EditPost
                postId={seePost?.id}
                title={seePost?.title}
                description={seePost?.description}
                openChatLink={seePost?.openChatLink}
                frontends={seePost?.frontends}
                backends={seePost?.backends}
                apps={seePost?.apps}
            />
        ) : (
            <SeePostDetail
                comments={comments}
                fetchMore={fetchMore}
                pageTitle={postTitle}
                seePost={seePost}
            />
        )
    );
};