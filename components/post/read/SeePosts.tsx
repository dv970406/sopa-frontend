/**
 * 생성일: 2022.02.18
 * 수정일: 2022.03.06
 */

import DisplayPost from '@components/post/read/DisplayPost';
import { postsState } from '@utils/atoms';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import SeeSemiDetail from './SeeSemiDetail';
import InfiniteScrolling from '@components/shared/InfiniteScrolling';
import NoData from '@components/shared/NoData';
import { IPostSemiDetailInfo } from '@utils/types/interfaces';
import Loading from '@components/shared/Loading';
import { ApolloQueryResult } from '@apollo/client';

const semiDetailVariants = {
    invisible: {
        backgroundColor: "rgba(0,0,0,0)"
    },
    visible: {
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    exit: {
        backgroundColor: "rgba(0,0,0,0)"
    }
};

interface ISeePostsComponent {
    loading?: boolean;
    fetchMore: () => Promise<ApolloQueryResult<unknown>>;
    howManyData: number;
};

export default function SeePosts({ loading, fetchMore, howManyData }: ISeePostsComponent) {
    const posts = useRecoilValue(postsState);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

    // AnimatedPresence가 서버 측에서 읽힐 때 경고문이 발생하는 데 이를 방지하기 위해 컴포넌트가 마운트 되기 전에는 빈 fragment만 반환
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!isLoaded) {
        return <></>;
    };
    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <InfiniteScrolling
                        howManyData={howManyData}
                        fetchMore={fetchMore}
                        css={`${posts?.length === 0 ? null : "grid gap-5 sm:grid-cols-2 xl:grid-cols-3"}`}
                    >
                        {posts?.length === 0 ? (
                            <NoData />
                        ) : (
                            posts?.map((post: IPostSemiDetailInfo, index: number) =>
                                <motion.div
                                    layoutId={String(index)}
                                    onClick={() => setSelectedPostId(index)}
                                    className="w-full"
                                    key={index}
                                >
                                    <DisplayPost key={index} {...post} />
                                </motion.div>
                            )
                        )}
                    </InfiniteScrolling>

                    <AnimatePresence>
                        {selectedPostId !== null ? (
                            <motion.div
                                className="fixed inset-0 flex items-center justify-center w-screen h-screen px-6 sm:px-20 md:px-32 lg:px-48 xl:px-72 2xl:px-96"
                                onClick={() => setSelectedPostId(null)}
                                variants={semiDetailVariants}
                                initial="invisible"
                                animate="visible"
                                exit="exit"
                            >
                                <motion.div
                                    layoutId={String(selectedPostId)}
                                    className="w-full"
                                >
                                    <SeeSemiDetail semiDetail={posts[selectedPostId]} />
                                </motion.div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
};