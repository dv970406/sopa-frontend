/**
 * 생성일: 2022.02.18
 * 수정일: ------
 */

import { IPostDetail } from '@utils/types/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import MetaData from './MetaData';
import SkillImage from './SkillImage';

interface IPostDetailComponent {
    postTitle: string;
    seePost: IPostDetail
}

const linkVar = {
    invisible: {
        x: -200,
        opacity: 0,
        scale: 0.2
    },
    visible: {
        x: 0,
        opacity: 1,
        scale: 1
    },
    exit: {
        x: -200,
        opacity: 0,
        scale: 0.2,

    }
}

export default function SeePost({ postTitle, seePost }: IPostDetailComponent) {
    const [showing, setShowing] = useState(false);
    const getShowing = (bool: boolean) => setShowing(bool);

    return (
        <>
            <h1
                className={`
                    text-4xl font-bold
                    border-b-2 border-b-fuchsia-400 w-full
                    p-3
                `}
            >
                {postTitle || seePost?.title}
            </h1>
            {seePost ? (
                <>
                    <div
                        className={`
                        flex justify-center gap-5
                    `}
                    >
                        <SkillImage
                            frontends={seePost?.frontends}
                            backends={seePost?.backends}
                            apps={seePost?.apps}
                        />
                    </div>
                    <p>{seePost?.description ?? "zz"}</p>
                    <div
                        className={`
                            flex justify-between
                        `}
                    >
                        {seePost?.openChatLink ? (
                            <motion.div
                                className={`
                                    flex space-x-2
                                    w-12 h-12
                                    hover:scale-110 transition-all
                                    cursor-pointer 
                                `}
                                onHoverStart={() => getShowing(true)}
                                onHoverEnd={() => getShowing(false)}
                            >
                                <img
                                    src="/kakao.png"
                                />
                                <AnimatePresence>
                                    {showing ? (
                                        <motion.div
                                            variants={linkVar}
                                            initial="invisible"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            {seePost.openChatLink}
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>
                            </motion.div>
                        ) : null}
                        <MetaData
                            postId={seePost?.id}
                            readCount={seePost?.readCount}
                            commentCount={seePost?.commentCount}
                            likeCount={seePost?.likeCount}
                            isLiked={seePost?.isLiked}
                        />

                    </div>

                </>
            ) : "처리중입니다..."
            }
        </>
    )
}