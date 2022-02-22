/**
 * 생성일: 2022.02.22
 * 수정일: ------
 */

import { gql, useQuery } from '@apollo/client';
import MainLayout from '@components/shared/MainLayout';
import MyActivity from '@components/user/read/MyActivity';
import Tab from '@components/user/read/Tab';
import { COMMENT_FRAGMENT, POST_DISPLAY_FRAGMENT, USER_DETAIL_FRAGMENT } from '@utils/fragments';
import { useState } from 'react';

const SEE_MY_PROFILE_QUERY = gql`
    query seeMyProfile{
        seeMyProfile{
            ...UserDetailFragment
            comments{
                ...CommentFragment
            }
            posts{
                ...PostDisplayFragment
            }
            likes{
                post{
                    ...PostDisplayFragment
                }
            }
        }
    }
    ${USER_DETAIL_FRAGMENT}
    ${COMMENT_FRAGMENT}
    ${POST_DISPLAY_FRAGMENT}
`

type kindOfTab = "like" | "post" | "comment"

export default function UserProfilePage() {
    const { data, loading } = useQuery(SEE_MY_PROFILE_QUERY);
    const [tab, setTab] = useState<kindOfTab>("like");

    return (
        <MainLayout loading={loading} title={data?.seeMyProfile?.name}>
            <div
                className="relative flex justify-center mb-5"
            >
                <div className='absolute h-2 w-full bg-fuchsia-300 top-4 -z-10 rounded-full' />
                <div
                    className='flex justify-between w-full'
                >
                    <Tab
                        count={data?.seeMyProfile?.likeCount}
                        tab={tab}
                        setTab={setTab}
                        onFocusTab="like"
                        svg={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        }
                    />
                    <Tab
                        count={data?.seeMyProfile?.postCount}
                        tab={tab}
                        setTab={setTab}
                        onFocusTab="post"
                        svg={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                />
                            </svg>
                        }
                    />
                    <Tab
                        count={data?.seeMyProfile?.commentCount}
                        tab={tab}
                        setTab={setTab}
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

            <MyActivity tab={tab} {...data} />
        </MainLayout >
    )
}