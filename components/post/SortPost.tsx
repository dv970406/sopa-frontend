/**
 * 생성일: 2022.02.18
 * 수정일: 2022.02.23
 */

import { postsState } from '@utils/atoms';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

type kindOfSortingMethod = "new" | "like"

export default function SortPost() {
    const [sortingMethod, setSortingMethod] = useState<kindOfSortingMethod>("new");
    const setPosts = useSetRecoilState(postsState);

    const getSortByLikes = (isSortByLikes: kindOfSortingMethod) => {
        setSortingMethod(isSortByLikes)

        switch (isSortByLikes) {
            case "like":
                setPosts(posts => {
                    const copiedPosts = [...posts]
                    return copiedPosts.sort((a, b) => Number(b.likeCount) - Number(a.likeCount))
                })
                break;
            case "new":
                setPosts(posts => {
                    const copiedPosts = [...posts]
                    return copiedPosts.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
                })
                break;
        }
    }

    useEffect(() => {
        setSortingMethod("new");
    }, [])
    return (
        <>
            <button
                className={`
                    flex items-center justify-center space-x-2
                    p-3 border-b-4  w-full
                    hover:border-b-fuchsia-400 transition-colors
                    text-lg
                    ${sortingMethod === "new" ? "border-b-fuchsia-500" : "border-b-fuchsia-200"}
                `}
                onClick={() => getSortByLikes("new")}
            >
                {sortingMethod === "new" ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="fuchsia"
                        className={`
                                h-6 w-6
                            `}
                    >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="fuchsia"
                        className={`
                            h-6 w-6
                        `}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )}
                <span>최신순</span>
            </button>

            <button
                className={`
                    flex items-center justify-center space-x-2
                    p-3 border-b-4  w-full
                    hover:border-b-fuchsia-400 transition-colors
                    text-lg
                    ${sortingMethod === "like" ? "border-b-fuchsia-500" : "border-b-fuchsia-200"}
                `}
                onClick={() => getSortByLikes("like")}
            >
                {sortingMethod === "like" ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="fuchsia"
                        className={`
                            w-6 h-6
                        `}
                    >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="fuchsia"
                        className={`
                            w-6 h-6
                        `}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                )}

                <span>관심순</span>
            </button>
        </>
    )
}