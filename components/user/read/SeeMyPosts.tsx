/**
 * 생성일: 2022.02.27
 * 수정일: ------
 */

import { gql, useQuery } from '@apollo/client';
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

    const myPostsCompleted = ({ seeMyPosts }: any) => setPosts(seeMyPosts);

    const { data: myPostsData, fetchMore: fetchMoreMyPosts, refetch: refetchMyPosts } = useQuery(SEE_MY_POSTS_QUERY, {
        onCompleted: myPostsCompleted,
    });

    useEffect(() => {
        if (myActivitiesTab === "post") {
            setPosts(myPostsData?.seeMyLikes);
        };
    }, [myActivitiesTab]);

    return (
        myActivitiesTab === "post" ? (
            <SeePosts
                howManyData={seeMyInfo?.postCount}
                refetchFn={refetchMyPosts}
                fetchMore={
                    () => fetchMoreMyPosts({
                        variables: { offset: myPostsData?.seeMyPosts?.length },
                    })
                }
            />
        ) : null
    )
}
