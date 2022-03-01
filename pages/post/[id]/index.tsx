/**
 * 생성일: 2022.02.21
 * 수정일: 2022.03.01
 */

import { gql, useQuery } from '@apollo/client';
import SeePost from '@components/post/read/SeePost';
import MainLayout from '@components/shared/MainLayout';
import { COMMENT_FRAGMENT, POST_DISPLAY_FRAGMENT } from '@utils/fragments';
import type { ICommentInfo } from '@utils/types/interfaces';
import { useRouter } from 'next/router'
import { useState } from 'react';

const SEE_POST_QUERY = gql`
    query seePost($postId:Int!,$offset:Int){
        seePost(postId:$postId){
            ...PostDisplayFragment
            comments(offset:$offset){
                ...CommentFragment
            }
        }
    }
    ${POST_DISPLAY_FRAGMENT}
    ${COMMENT_FRAGMENT}
`

export default function PostDetailPage() {
    const router = useRouter();
    const { id: postId, title: postTitle } = router.query;
    const [comments, setComments] = useState<ICommentInfo[]>([]);

    // onCompleted 함수로 초기 comments 데이터 세팅 및 인피니티 스크롤링으로 fetchMore 작동 시 가져온 데이터 세팅을 돕는다.
    const seePostCompleted = ({ seePost }: any) => setComments(seePost?.comments)

    const { data, loading, fetchMore } = useQuery(SEE_POST_QUERY, {
        variables: {
            postId: +postId!
        },
        onCompleted: seePostCompleted
    })

    return (
        <MainLayout loading={loading} title={`${postTitle || data?.seePost?.title}`}>
            <div
                className={`
                    sm:px-16 md:px-24 lg:px-48 xl:px-96 space-y-8
                `}
            >
                <SeePost
                    fetchMore={
                        () => fetchMore({
                            variables: { offset: data?.seePost?.comments?.length },
                        })
                    }
                    comments={comments}
                    postTitle={postTitle}
                    {...data}
                />
            </div>
        </MainLayout>
    )
}