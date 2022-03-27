/**
 * 생성일: 2022.02.25
 * 수정일: 2022.03.05
 */

import { ApolloQueryResult } from '@apollo/client';
import { postSortMethodState, searchModeState, selectedSkillsState } from '@utils/atoms';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilValue } from 'recoil';

interface IInfiniteScrollingComponent {
    howManyData: number;
    children: React.ReactNode;
    fetchMore: () => Promise<ApolloQueryResult<unknown>>;
    css: string;
};

export default function InfiniteScrolling({ howManyData, children, fetchMore, css }: IInfiniteScrollingComponent) {
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
    const [countDataLength, setCountDataLength] = useState(0);
    const selectedSkills = useRecoilValue(selectedSkillsState);
    const postSortMethod = useRecoilValue(postSortMethodState);
    const searchMode = useRecoilValue(searchModeState);

    const getFetchMore = async () => {
        setFetchMoreLoading(true);
        await fetchMore();
        setFetchMoreLoading(false);
        setCountDataLength(prevCount => prevCount + 1);
    };

    // hasMore을 정해주기 위해 likeCount, postCount, commentCount 등을 가져와서 조건식에 활용함
    const isHasMore = howManyData >= countDataLength * 6;

    useEffect(() => {
        setCountDataLength(0);
    }, [selectedSkills, postSortMethod, searchMode]);

    return (
        <InfiniteScroll
            dataLength={countDataLength * 6}
            next={getFetchMore}
            hasMore={searchMode ? false : isHasMore}
            loader={fetchMoreLoading ? (
                <h4 className="font-bold text-center text-sopa-accent">가져오는 중입니다.</h4>
            ) : null}
            className={`${css} p-4 w-full h-full`}
            scrollThreshold={0.9}
        >
            {children}
        </InfiniteScroll>
    );
};