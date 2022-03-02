/**
 * 생성일: 2022.02.22
 * 수정일: 2022.03.02
 */

import { gql, useQuery } from '@apollo/client';
import MainLayout from '@components/shared/MainLayout';
import ProfileTab from '@components/user/read/ProfileTab';
import SeeMyComments from '@components/user/read/SeeMyComments';
import SeeMyPosts from '@components/user/read/SeeMyPosts';
import { myActivitiesTabState, tokenState } from '@utils/atoms';
import { USER_DETAIL_FRAGMENT } from '@utils/fragments';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';


const SEE_MY_INFO_QUERY = gql`
    query seeMyInfo{
        seeMyInfo{
            ...UserDetailFragment
        }
    }
    ${USER_DETAIL_FRAGMENT}
`;

export default function UserProfilePage() {
    const myActivitiesTab = useRecoilValue(myActivitiesTabState);
    const { data: userData } = useQuery(SEE_MY_INFO_QUERY);
    const token = useRecoilValue(tokenState);
    const router = useRouter();
    const NoSsrSeeMyLikes = dynamic(
        () => import('@components/user/read/SeeMyLikes'),
        { ssr: false }
    )

    // NoSsr로 화면이 미리 보여지는 것을 막고 useLayoutEffect로 앱 페인트 전에 함수를 실행시킨다고 해서 딱히 유용할지는 모르겠다.
    useLayoutEffect(() => {
        if (!token) router.back();
    }, [])
    return (
        <MainLayout title={userData?.seeMyInfo?.name}>
            <div className={`sm:px-16 md:px-24 lg:px-28 xl:px-48 space-y-8`}>
                <div
                    className={`
                    relative flex justify-center mb-5
                `}
                >
                    <div className='absolute h-2 w-full bg-sopa-pure top-4 -z-10 rounded-full' />
                    <div
                        className='flex justify-between w-full'
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
                {myActivitiesTab === "like" ? <NoSsrSeeMyLikes seeMyInfo={userData?.seeMyInfo} /> : null}
                {myActivitiesTab === "post" ? <SeeMyPosts seeMyInfo={userData?.seeMyInfo} /> : null}
                {myActivitiesTab === "comment" ? <SeeMyComments seeMyInfo={userData?.seeMyInfo} /> : null}
            </div>
        </MainLayout >
    )
}