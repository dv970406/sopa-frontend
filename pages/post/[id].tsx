/**
 * 생성일: 2022.02.18
 * 수정일: ------
 */

import { gql, useQuery } from '@apollo/client';
import PostDetail from '@components/post/PostDetail';
import MainLayout from '@components/shared/MainLayout';
import { POST_DETAIL_FRAGMENT } from '@utils/fragments';
import { useRouter } from 'next/router'

const SEE_POST_QUERY = gql`
    query seePost($postId:Int!){
        seePost(postId:$postId){
            ...PostDetailFragment
        }
    }
    ${POST_DETAIL_FRAGMENT}
`

export default function SeePost() {
    const router = useRouter();
    const { id: postId, title: postTitle } = router.query;

    // 백엔드 로직이 readCount를 +1하고 post를 return하는지라 딱히 cache 작업은 필요하지 않은 듯
    const { data } = useQuery(SEE_POST_QUERY, {
        variables: {
            postId: +postId!
        },
    })

    return (
        <MainLayout title={`${postTitle || data?.seePost?.title}`}>
            <div
                className={`
                    space-y-3
                `}
            >
                <PostDetail
                    postTitle={postTitle}
                    {...data}
                />
            </div>
        </MainLayout>
    )
}