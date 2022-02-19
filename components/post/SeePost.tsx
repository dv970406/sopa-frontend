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
        x: -150,
        opacity: 0,
        scale: 0.2
    },
    visible: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2
        }
    },
    exit: {
        x: -100,
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
                                    flex
                                    w-12 h-12
                                    hover:scale-110 transition-all
                                    cursor-pointer 
                                `}
                                onHoverStart={() => getShowing(true)}
                                onHoverEnd={() => getShowing(false)}
                            >
                                <motion.img
                                    src="/kakao.png"
                                    whileHover={{
                                        rotateZ: 360,
                                        transition: {
                                            duration: 0.7
                                        }
                                    }}
                                />
                                <AnimatePresence>
                                    {showing ? (
                                        <motion.div
                                            variants={linkVar}
                                            initial="invisible"
                                            animate="visible"
                                            exit="exit"
                                            className={`
                                                flex flex-col items-center justify-center
                                                bg-fuchsia-300 p-2
                                                rounded-r-lg text-sm
                                            `}
                                        >
                                            {seePost.openChatLink}
                                            <div
                                                className={`
                                                    flex items-center
                                                `}
                                            >
                                                카카오 오픈채팅 바로가기
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
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