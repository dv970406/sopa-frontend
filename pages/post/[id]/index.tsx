/**
 * 생성일: 2022.02.21
 * 수정일: 2022.03.05
 */

import { gql, useQuery } from '@apollo/client';
import SeePost from '@components/post/read/SeePost';
import MainLayout from '@components/shared/MainLayout';
import { COMMENT_FRAGMENT, POST_DISPLAY_FRAGMENT } from '@utils/fragments';
import type { ICommentInfo } from '@utils/types/interfaces';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
`;

export default function PostDetailPage() {
    const router = useRouter();
    const { id: postId, title: postTitle } = router.query;
    const [comments, setComments] = useState<ICommentInfo[]>([]);

    const { data, loading, fetchMore } = useQuery(SEE_POST_QUERY, {
        variables: {
            postId: +postId!
        },
    });

    useEffect(() => {
        setComments(data?.seePost?.comments!);
    }, [data]);

    return (
        <MainLayout loading={loading} title={`${postTitle || data?.seePost?.title}`}>
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
        </MainLayout>
    );
};