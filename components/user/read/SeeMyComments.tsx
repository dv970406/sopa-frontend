/**
 * 생성일: 2022.02.27
 * 수정일: 2022.03.02
 */

import { gql, useQuery } from '@apollo/client';
import { commentsState, myActivitiesTabState } from '@utils/atoms';
import { COMMENT_FRAGMENT } from '@utils/fragments';
import { ICommentInfo } from '@utils/types/interfaces';
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
interface ISeeMyCommentsQuery {
    seeMyComments: ICommentInfo[]
}

export default function SeeMyComments({ seeMyInfo }: ISeeMyCommentsComponent) {
    const myActivitiesTab = useRecoilValue(myActivitiesTabState)
    const setComments = useSetRecoilState(commentsState);

    const { data: myCommentsData, fetchMore: fetchMoreMyComments } = useQuery<ISeeMyCommentsQuery>(SEE_MY_COMMENTS_QUERY);

    useEffect(() => {
        if (myActivitiesTab === "comment") {
            setComments(myCommentsData?.seeMyComments!);
        };
    }, [myActivitiesTab]);
    useEffect(() => {
        setComments(myCommentsData?.seeMyComments!);
    }, [myCommentsData]);

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