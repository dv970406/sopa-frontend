/**
 * 생성일: 2022.02.27
 * 수정일: 2022.03.02
 */

import { gql, useQuery } from '@apollo/client';
import SeePosts from '@components/post/read/SeePosts';
import { myActivitiesTabState, postsState } from '@utils/atoms';
import { POST_DISPLAY_FRAGMENT } from '@utils/fragments';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ArrangePosts from '@components/post/ArrangePosts';
import { IPostDisplay } from '@utils/types/interfaces';

const SEE_MY_LIKES_QUERY = gql`
    query seeMyLikes($offset:Int,$howToArrangement:String){
        seeMyLikes(offset:$offset,howToArrangement:$howToArrangement){
            ...PostDisplayFragment
        }
    }
    ${POST_DISPLAY_FRAGMENT}
`;

interface ISeeMyLikesComponent {
    seeMyInfo: {
        likeCount: number;
    }
}
interface ISeeMyLikesQuery {
    seeMyLikes: IPostDisplay[]
}

export default function SeeMyLikes({ seeMyInfo }: ISeeMyLikesComponent) {
    const myActivitiesTab = useRecoilValue(myActivitiesTabState);
    const setPosts = useSetRecoilState(postsState);

    const { data: myLikesData, fetchMore: fetchMoreMyLikes, refetch: refetchMyLikes } = useQuery<ISeeMyLikesQuery>(SEE_MY_LIKES_QUERY);

    useEffect(() => {
        if (myActivitiesTab === "like") {
            setPosts(myLikesData?.seeMyLikes!);
        };
    }, [myActivitiesTab]);
    useEffect(() => {
        setPosts(myLikesData?.seeMyLikes!)
    }, [myLikesData])

    return (
        myActivitiesTab === "like" ? (
            <>
                <ArrangePosts refetchFn={refetchMyLikes} />
                <SeePosts
                    howManyData={seeMyInfo?.likeCount}
                    fetchMore={
                        () => fetchMoreMyLikes({
                            variables: { offset: myLikesData?.seeMyLikes?.length },
                        })
                    }
                />
            </>
        ) : null
    )
}