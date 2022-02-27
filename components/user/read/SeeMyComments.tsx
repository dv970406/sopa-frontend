/**
 * 생성일: 2022.02.27
 * 수정일: ------
 */

import { gql, useQuery } from '@apollo/client';
import { commentsState, myActivitiesTabState } from '@utils/atoms';
import { COMMENT_FRAGMENT } from '@utils/fragments';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import MyComments from './MyComments';

const SEE_MY_COMMENTS_QUERY = gql`
    query seeMyComments($offset:Int){
        seeMyComments(offset:$offset){
            ...CommentFragment
        }
    }
    ${COMMENT_FRAGMENT}
`;

interface ISeeMyCommentsComponent {
    seeMyInfo: {
        commentCount: number;
    }
}

export default function SeeMyComments({ seeMyInfo }: ISeeMyCommentsComponent) {
    const myActivitiesTab = useRecoilValue(myActivitiesTabState)
    const setComments = useSetRecoilState(commentsState);

    // onCompleted 함수로 초기 comments 데이터 세팅 및 인피니티 스크롤링으로 fetchMore 작동 시 가져온 데이터 세팅을 돕는다.
    const myCommentsCompleted = ({ seeMyComments }: any) => setComments(seeMyComments)

    const { data: myCommentsData, fetchMore: fetchMoreMyComments } = useQuery(SEE_MY_COMMENTS_QUERY, {
        onCompleted: myCommentsCompleted
    });

    useEffect(() => {
        if (myActivitiesTab === "comment") {
            setComments(myCommentsData?.seeMyComments);
        };
    }, [myActivitiesTab]);

    return (
        myActivitiesTab === "comment" ? (
            <MyComments
                howManyData={seeMyInfo?.commentCount}
                fetchMore={
                    () => fetchMoreMyComments({
                        variables: { offset: myCommentsData?.seeMyComments?.length },
                    })
                }
            />
        ) : null
    )
}