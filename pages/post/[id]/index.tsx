/**
 * 생성일: 2022.02.21
 * 수정일: 2022.02.25
 */

import { gql, useQuery } from '@apollo/client';
import SeePost from '@components/post/read/SeePost';
import MainLayout from '@components/shared/MainLayout';
import { POST_DETAIL_FRAGMENT } from '@utils/fragments';
import { ICommentInfo } from '@utils/types/interfaces';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

const SEE_POST_QUERY = gql`
    query seePost($postId:Int!,$offset:Int){
        seePost(postId:$postId,offset:$offset){
            ...PostDetailFragment
        }
    }
    ${POST_DETAIL_FRAGMENT}
`

export default function PostDetailPage() {
    const router = useRouter();
    const { id: postId, title: postTitle } = router.query;
    const [comments, setComments] = useState<ICommentInfo[]>([]);

    // 백엔드 로직이 readCount를 +1하고 post를 return하는지라 딱히 cache 작업은 필요하지 않은 듯
    const { data, loading, fetchMore } = useQuery(SEE_POST_QUERY, {
        variables: {
            postId: +postId!
        },
    })

    useEffect(() => {
        setComments(data?.seePost?.comments)
    }, [data])
    return (
        <MainLayout loading={loading} title={`${postTitle || data?.seePost?.title}`}>
            <div
                className={`
                    space-y-3
                    lg:px-32
                `}
            >
                <SeePost
                    fetchMore={
                        () => fetchMore({
                            variables: { offset: data?.seePost?.comments?.length },
                            updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;
                                const { seePost: { comments } }: any = fetchMoreResult
                                setComments(oldComments => [...oldComments, ...comments])
                                return;
                            }
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