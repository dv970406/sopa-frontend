/**
 * 생성일: 2022.02.18
 * 수정일: ------
 */

import DisplayPost from '@components/post/DisplayPost'
import SortPost from '@components/post/SortPost'
import { IPostDisplay } from '@utils/types/interfaces';
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react';
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

interface SeePosts {
    posts: IPostDisplay[]
}

export default function SeePosts({ posts }: SeePosts) {
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
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
                {posts.map((post, index) =>
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