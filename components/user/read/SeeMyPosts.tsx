/**
 * 생성일: 2022.02.27
 * 수정일: 2022.03.01
 */

import { gql, useQuery } from '@apollo/client';
import ArrangePosts from '@components/post/ArrangePosts';
import SeePosts from '@components/post/read/SeePosts';
import { myActivitiesTabState, postsState } from '@utils/atoms';
import { POST_DISPLAY_FRAGMENT } from '@utils/fragments';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const SEE_MY_POSTS_QUERY = gql`
    query seeMyPosts($offset:Int,$howToArrangement:String){
        seeMyPosts(offset:$offset,howToArrangement:$howToArrangement){
            ...PostDisplayFragment
        }
    }
    ${POST_DISPLAY_FRAGMENT}
`;

interface ISeeMyPostsComponent {
    seeMyInfo: {
        postCount: number;
    }
}

export default function SeeMyPosts({ seeMyInfo }: ISeeMyPostsComponent) {
    const myActivitiesTab = useRecoilValue(myActivitiesTabState);
    const setPosts = useSetRecoilState(postsState);

    const { data: myPostsData, fetchMore: fetchMoreMyPosts, refetch: refetchMyPosts } = useQuery(SEE_MY_POSTS_QUERY);

    useEffect(() => {
        if (myActivitiesTab === "post") {
            setPosts(myPostsData?.seeMyLikes);
        };
    }, [myActivitiesTab]);
    useEffect(() => {
        setPosts(myPostsData?.seeMyPosts);
    }, [myPostsData])

    return (
        myActivitiesTab === "post" ? (
            <>
                <ArrangePosts refetchFn={refetchMyPosts} />
                <SeePosts
                    howManyData={seeMyInfo?.postCount}
                    fetchMore={
                        () => fetchMoreMyPosts({
                            variables: { offset: myPostsData?.seeMyPosts?.length },
                        })
                    }
                />
            </>
        ) : null
    )
}
