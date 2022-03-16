/**
 * 생성일: 2022.02.21
 * 수정일: 2022.03.16
 */

import { gql, useQuery } from '@apollo/client';
import SeePost from '@components/post/read/SeePost';
import MainLayout from '@components/shared/MainLayout';
import { client } from '@utils/apollo';
import { COMMENT_FRAGMENT, POST_DISPLAY_FRAGMENT } from '@utils/fragments';
import type { ICommentInfo, IPostDetailInfo } from '@utils/types/interfaces';
import { GetServerSidePropsContext, NextPage } from 'next';
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

interface ISeePostCompleted {
    seePost: IPostDetailInfo;
}

const PostDetailPage: NextPage = () => {
    const router = useRouter();
    const { id: postId, title: postTitle } = router.query;
    const [comments, setComments] = useState<ICommentInfo[]>([]);

    const seePostCompleted = ({ seePost }: ISeePostCompleted) => {
        if (!seePost) {
            router.replace("/");
            return;
        }
    };

    const { data, fetchMore } = useQuery(SEE_POST_QUERY, {
        variables: {
            postId: +postId!
        },
        onCompleted: seePostCompleted,
    });
    useEffect(() => {
        setComments(data?.seePost?.comments!);
    }, [data]);

    return (
        <MainLayout title={`${postTitle || data?.seePost?.title}`}>
            <SeePost
                fetchMore={
                    () => fetchMore({
                        variables: { offset: data?.seePost?.comments?.length },
                    })
                }
                comments={comments}
                postTitle={postTitle as string}
                seePost={data?.seePost!}
            />
        </MainLayout>
    );
};

export async function getServerSideProps({ req, res, query }: GetServerSidePropsContext) {

    const { data } = await client.query({
        query: SEE_POST_QUERY,
        variables: {
            postId: +query.id!
        },
        context: {
            headers: {
                token: req.cookies["TOKEN"]
            }
        },
    });

    if (!data?.seePost) {
        res.statusCode = 404;
        return res.end(`/Post/${query.id} is Not Found`);
    };

    return {
        props: {
            initialCache: client.cache.extract()
        }
    }
}

export default PostDetailPage;