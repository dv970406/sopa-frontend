/**
 * 생성일: 2022.02.18
 * 수정일: 2022.03.03
 */

import { postArrangementMethodState } from '@utils/atoms';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import SortTab from './SortTab';

interface IArrangePostComponent {
    refetchFn: any;
}

export default function SortPosts({ refetchFn }: IArrangePostComponent) {
    const [postArrangementMethod, setPostArrangementMethod] = useRecoilState(postArrangementMethodState);

    useEffect(() => {
        refetchFn({
            howToArrangement: postArrangementMethod
        })
    }, [postArrangementMethod])

    return (
        <div
            className="flex space-x-3 mb-8"
        >
            <SortTab
                onClick={() => setPostArrangementMethod("new")}
                comparisonTarget={postArrangementMethod}
                selectedTab="new"
                tabName={
                    postArrangementMethod === "new" ? (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="fuchsia"
                                className={`
                                    h-6 w-6
                                `}
                            >
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span>최신순</span>
                        </>
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="fuchsia"
                                className={`
                                    h-6 w-6
                                `}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>최신순</span>
                        </>
                    )
                }
            />
            <SortTab
                comparisonTarget={postArrangementMethod}
                onClick={() => setPostArrangementMethod("likeCount")}
                selectedTab="likeCount"
                tabName={
                    postArrangementMethod === "likeCount" ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="fuchsia">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <span>관심순</span>
                        </>

                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="fuchsia">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>관심순</span>
                        </>
                    )
                }
            />
            <SortTab
                comparisonTarget={postArrangementMethod}
                onClick={() => setPostArrangementMethod("readCount")}
                selectedTab="readCount"
                tabName={
                    postArrangementMethod === "readCount" ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="fuchsia">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            <span>조회순</span>
                        </>

                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="fuchsia">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>조회순</span>
                        </>
                    )
                }
            />
            <SortTab
                comparisonTarget={postArrangementMethod}
                onClick={() => setPostArrangementMethod("commentCount")}
                selectedTab="commentCount"
                tabName={
                    postArrangementMethod === "commentCount" ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="fuchsia">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                            <span>댓글순</span>
                        </>

                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="fuchsia">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>댓글순</span>
                        </>
                    )
                }
            />
        </div>
    )
}