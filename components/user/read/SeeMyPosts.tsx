/**
 * 생성일: 2022.02.27
 * 수정일: 2022.03.03
 */

import { gql, useQuery } from '@apollo/client';
import SortPosts from '@components/post/SortPosts';
import SeePosts from '@components/post/read/SeePosts';
import { myActivitiesTabState, postsState } from '@utils/atoms';
import { POST_DISPLAY_FRAGMENT } from '@utils/fragments';
import { IPostDisplay } from '@utils/types/interfaces';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const SEE_MY_POSTS_QUERY = gql`
    query seeMyPosts($offset:Int,$howToSort:String){
        seeMyPosts(offset:$offset,howToSort:$howToSort){
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
interface ISeeMyPostsQuery {
    seeMyPosts: IPostDisplay[]
};


export default function SeeMyPosts({ seeMyInfo }: ISeeMyPostsComponent) {
    const myActivitiesTab = useRecoilValue(myActivitiesTabState);
    const setPosts = useSetRecoilState(postsState);

    const { data: myPostsData, fetchMore: fetchMoreMyPosts, refetch: refetchMyPosts } = useQuery<ISeeMyPostsQuery>(SEE_MY_POSTS_QUERY);

    useEffect(() => {
        if (myActivitiesTab === "post") {
            setPosts(myPostsData?.seeMyPosts!);
        };
    }, [myActivitiesTab]);
    useEffect(() => {
        setPosts(myPostsData?.seeMyPosts!);
    }, [myPostsData])

    return (
        myActivitiesTab === "post" ? (
            <>
                <SortPosts refetchFn={refetchMyPosts} />
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
