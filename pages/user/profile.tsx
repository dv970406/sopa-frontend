/**
 * 생성일: 2022.02.22
 * 수정일: 2022.03.05
 */

import { gql, useQuery } from '@apollo/client';
import MainLayout from '@components/shared/MainLayout';
import ProfileTab from '@components/user/read/ProfileTab';
import SeeMyComments from '@components/user/read/SeeMyComments';
import SeeMyLikes from '@components/user/read/SeeMyLikes';
import SeeMyPosts from '@components/user/read/SeeMyPosts';
import { myActivitiesTabState } from '@utils/atoms';
import { USER_DETAIL_FRAGMENT } from '@utils/fragments';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';


const SEE_MY_INFO_QUERY = gql`
    query seeMyInfo{
        seeMyInfo{
            ...UserDetailFragment
        }
    }
    ${USER_DETAIL_FRAGMENT}
`;

export default function UserProfilePage() {
    const [myActivitiesTab, setMyActivitiesTab] = useRecoilState(myActivitiesTabState);
    const { data: userData } = useQuery(SEE_MY_INFO_QUERY);

    useEffect(() => {
        setMyActivitiesTab("like");
    }, []);
    return (
        <MainLayout title={userData?.seeMyInfo?.name}>
            <div
                className="
                    relative flex justify-center 
                    mb-5
                "
            >
                <div
                    className="
                        absolute top-4 -z-10 rounded-full
                        h-2 w-full
                        bg-sopa-pure  
                    "
                />
                <div
                    className="
                        flex justify-around 
                        w-full
                    "
                >
                    <ProfileTab
                        autoFocus
                        count={userData?.seeMyInfo?.likeCount}
                        onFocusTab="like"
                        svg={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        }
                    />
                    <ProfileTab
                        count={userData?.seeMyInfo?.postCount}
                        onFocusTab="post"
                        svg={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                />
                            </svg>
                        }
                    />
                    <ProfileTab
                        count={userData?.seeMyInfo?.commentCount}
                        onFocusTab="comment"
                        svg={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                        }
                    />
                </div>
            </div>
            {myActivitiesTab === "like" ? <SeeMyLikes seeMyInfo={userData?.seeMyInfo} /> : null}
            {myActivitiesTab === "post" ? <SeeMyPosts seeMyInfo={userData?.seeMyInfo} /> : null}
            {myActivitiesTab === "comment" ? <SeeMyComments seeMyInfo={userData?.seeMyInfo} /> : null}
        </MainLayout>
    );
};