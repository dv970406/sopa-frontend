/**
 * 생성일: 2022.02.18
 * 수정일: 2022.02.23
 */

import DisplayPost from '@components/post/read/DisplayPost'
import { postsState } from '@utils/atoms';
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import SortPost from '../SortPost';
import SeeSemiDetail from './SeeSemiDetail';

const semiDetailVar = {
    invisible: {
        backgroundColor: "rgba(0,0,0,0)"
    },
    visible: {
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    exit: {
        backgroundColor: "rgba(0,0,0,0)"
    }
}

export default function SeePosts() {
    const posts = useRecoilValue(postsState)
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

    // AnimatedPresence가 SSR에서 읽힐 때 경고문이 발생하는 데 이를 방지하기 위해 컴포넌트가 마운트 되기 전에는 아무것도 반환하지 않게함
    const [isLoaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!isLoaded) {
        return <></>;
    }
    return (
        <>
            <div
                className={`
                    flex space-x-3
                    mb-8
                `}
            >
                <SortPost />
            </div>
            <div
                className={`
                    flex flex-wrap gap-5
                `}
            >
                {posts?.map((post, index) =>
                    <motion.button
                        layoutId={String(index)}
                        onClick={() => setSelectedPostId(index)}
                        className={` w-full `}
                        key={index}
                    >
                        <DisplayPost key={index} {...post} />
                    </motion.button>
                )}
            </div>
            <AnimatePresence>
                {selectedPostId !== null ? (
                    <motion.div
                        className={`
                            flex justify-center items-center px-12
                            fixed top-0 left-0 right-0 h-screen w-screen
                        `}
                        onClick={() => setSelectedPostId(null)}
                        variants={semiDetailVar}
                        initial="invisible"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            layoutId={String(selectedPostId)}
                            className={` w-full `}
                        >
                            <SeeSemiDetail semiDetail={posts[selectedPostId]} />
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    )
}