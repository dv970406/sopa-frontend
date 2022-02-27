/**
 * 생성일: 2022.02.25
 * 수정일: 2022.02.27
 */

import { postArrangementMethodState, selectedSkillsState } from '@utils/atoms';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilValue } from 'recoil';

interface IInfiniteScrollingComponent {
    howManyData: number;
    children: React.ReactNode;
    fetchMore?: any;
    css: string;
}

export default function InfiniteScrolling({ howManyData, children, fetchMore, css }: IInfiniteScrollingComponent) {
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
    const [countDataLength, setCountDataLength] = useState(0);
    const selectedSkills = useRecoilValue(selectedSkillsState);
    const postArrangementMethod = useRecoilValue(postArrangementMethodState);

    const getFetchMore = async () => {
        setFetchMoreLoading(true);
        await fetchMore();
        setFetchMoreLoading(false);
        setCountDataLength(prevCount => prevCount + 1)
    }

    // hasMore을 정해주기 위해 likeCount, postCount, commentCount 등을 가져와서 조건식에 활용함
    const isHasMore = howManyData >= countDataLength * 6

    useEffect(() => {
        setCountDataLength(0);
    }, [selectedSkills, postArrangementMethod])

    return (
        <InfiniteScroll
            dataLength={countDataLength * 6}
            next={getFetchMore}
            hasMore={isHasMore}
            loader={fetchMoreLoading ? (
                <h4 className="text-center text-fuchsia-500 font-bold">가져오는 중입니다.</h4>
            ) : null}
            className={`${css} p-4`}
            scrollThreshold={0.95}
            endMessage={<h4 className="text-center text-fuchsia-500 font-bold">끗!</h4>}
        >
            {children}
        </InfiniteScroll>
    )
}