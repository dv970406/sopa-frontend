/**
 * 생성일: 2022.02.22
 * 수정일: 2022.02.26
 */

import { gql, useQuery } from '@apollo/client';
import SeePosts from '@components/post/read/SeePosts';
import MainLayout from '@components/shared/MainLayout';
import MyComments from '@components/user/read/MyComments';
import ProfileTab from '@components/user/read/ProfileTab';
import { commentsState, postsState } from '@utils/atoms';
import { COMMENT_FRAGMENT, POST_DISPLAY_FRAGMENT, USER_DETAIL_FRAGMENT } from '@utils/fragments';
import { IPostDisplay } from '@utils/types/interfaces';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

const SEE_MY_INFO_QUERY = gql`
    query seeMyInfo{
        seeMyInfo{
            ...UserDetailFragment
        }
    }
    ${USER_DETAIL_FRAGMENT}
`

const SEE_MY_COMMENTS_QUERY = gql`
    query seeMyComments($offset:Int){
        seeMyComments(offset:$offset){
            ...CommentFragment
        }
    }
    ${COMMENT_FRAGMENT}
`
const SEE_MY_LIKES_QUERY = gql`
    query seeMyLikes($offset:Int){
        seeMyLikes(offset:$offset){
            post{
                ...PostDisplayFragment
            }
        }
    }
    ${POST_DISPLAY_FRAGMENT}
`
const SEE_MY_POSTS_QUERY = gql`
    query seeMyPosts($offset:Int){
        seeMyPosts(offset:$offset){
            ...PostDisplayFragment
        }
    }
    ${POST_DISPLAY_FRAGMENT}
`


export type kindOfTab = "like" | "post" | "comment"


export default function UserProfilePage() {
    const [tab, setTab] = useState<kindOfTab>("like");
    const setComments = useSetRecoilState(commentsState);
    const setPosts = useSetRecoilState(postsState);

    // 세 개의 onCompleted 함수로 초기 comments 데이터 세팅 및 인피니티 스크롤링으로 fetchMore 작동 시 가져온 데이터 세팅을 돕는다.
    const myLikesCompleted = ({ seeMyLikes }: any) => {
        const postsPressedLike = seeMyLikes?.map((like: { post: IPostDisplay }) => like.post);
        setPosts(postsPressedLike);
    }
    const myPostsCompleted = ({ seeMyPosts }: any) => setPosts(seeMyPosts);
    const myCommentsCompleted = ({ seeMyComments }: any) => setComments(seeMyComments)


    const { data: userData } = useQuery(SEE_MY_INFO_QUERY);
    const { data: myLikesData, fetchMore: fetchMoreLikes } = useQuery(SEE_MY_LIKES_QUERY, {
        onCompleted: myLikesCompleted
    });
    const { data: myPostsData, fetchMore: fetchMorePosts } = useQuery(SEE_MY_POSTS_QUERY, {
        onCompleted: myPostsCompleted
    });
    const { data: myCommentsData, fetchMore: fetchMoreComments } = useQuery(SEE_MY_COMMENTS_QUERY, {
        onCompleted: myCommentsCompleted
    });

    useEffect(() => {
        switch (tab) {
            case "like":
                const postsPressedLike = myLikesData?.seeMyLikes?.map((like: { post: IPostDisplay }) => like.post)
                setPosts(postsPressedLike);
                break;
            case "post":
                setPosts(myPostsData?.seeMyPosts);
                break;
            case "comment":
                setComments(myCommentsData?.seeMyComments);
                break;
        }
    }, [tab]);

    const getFetchMore = (tab: string) => {
        switch (tab) {
            case "like":
                return () => fetchMoreLikes({
                    variables: { offset: myLikesData?.seeMyLikes?.length },
                });

            case "post":
                return () => fetchMorePosts({
                    variables: { offset: myPostsData?.seeMyPosts?.length },
                });

            case "comment":
                return () => fetchMoreComments({
                    variables: { offset: myCommentsData?.seeMyComments?.length },
                })
        }
    }

    return (
        <MainLayout title={userData?.seeMyInfo?.name}>
            <div
                className="
                    relative flex justify-center mb-5
                    md:px-12 lg:px-24 xl:px-48
                "
            >
                <div className='absolute h-2 w-full bg-fuchsia-300 top-4 -z-10 rounded-full' />
                <div
                    className='flex justify-between w-full'
                >
                    <ProfileTab
                        autoFocus
                        count={userData?.seeMyInfo?.likeCount}
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
                    <ProfileTab
                        count={userData?.seeMyInfo?.postCount}
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
                    <ProfileTab
                        count={userData?.seeMyInfo?.commentCount}
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

            {tab === "like" ? <SeePosts fetchMore={getFetchMore(tab)} /> : null}
            {tab === "post" ? <SeePosts fetchMore={getFetchMore(tab)} /> : null}
            {tab === "comment" ? <MyComments fetchMore={getFetchMore(tab)} /> : null}
        </MainLayout >
    )
}