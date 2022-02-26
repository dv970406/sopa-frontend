/**
 * 생성일: 2022.02.25
 * 수정일: 2022.02.26
 */

import React, { useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

interface IInfiniteScrollingComponent {
    children: React.ReactNode;
    fetchMore?: any;
    css: string;
}

export default function InfiniteScrolling({ children, fetchMore, css }: IInfiniteScrollingComponent) {
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
    const [countDataLength, setCountDataLength] = useState(0)

    const getFetchMore = async () => {
        setFetchMoreLoading(true);
        await fetchMore();
        setFetchMoreLoading(false);
        setCountDataLength(prevCount => prevCount + 1)
    }

    return (
        <InfiniteScroll
            dataLength={countDataLength * 6}
            next={getFetchMore}
            hasMore={true}
            loader={fetchMoreLoading ? (
                <h4 className="text-center text-fuchsia-500 font-bold">가져오는 중입니다.</h4>
            ) : null}
            className={`${css} p-4`}
            scrollThreshold={1}
            endMessage={<h4 className="text-center text-fuchsia-500 font-bold">더 이상 없습니다ㅠㅠ</h4>}
        >
            {children}
        </InfiniteScroll>
    )
}