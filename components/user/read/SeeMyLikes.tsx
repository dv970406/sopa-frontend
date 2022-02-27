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

export default function SeeMyLikes({ seeMyInfo }: ISeeMyLikesComponent) {
    const myActivitiesTab = useRecoilValue(myActivitiesTabState);
    const setPosts = useSetRecoilState(postsState);

    const myLikesCompleted = ({ seeMyLikes }: any) => setPosts(seeMyLikes);

    const { data: myLikesData, fetchMore: fetchMoreMyLikes, refetch: refetchMyLikes } = useQuery(SEE_MY_LIKES_QUERY, {
        onCompleted: myLikesCompleted,
    });

    useEffect(() => {
        if (myActivitiesTab === "like") {
            setPosts(myLikesData?.seeMyLikes);
        };
    }, [myActivitiesTab]);

    return (
        myActivitiesTab === "like" ? (
            <SeePosts
                howManyData={seeMyInfo?.likeCount}
                refetchFn={refetchMyLikes}
                fetchMore={
                    () => fetchMoreMyLikes({
                        variables: { offset: myLikesData?.seeMyLikes?.length },
                    })
                }
            />
        ) : null
    )
}