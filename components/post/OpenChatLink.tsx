/**
 * 생성일: 2022.02.19
 * 수정일: ------
 */

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

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

interface IOpenChatLink {
    openChatLink: string;
}

export default function OpenChatLink({ openChatLink }: IOpenChatLink) {
    const [showing, setShowing] = useState(false);
    const getShowing = (bool: boolean) => setShowing(bool);

    return (
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
                        {openChatLink}
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
    )
}