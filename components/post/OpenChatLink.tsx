/**
 * 생성일: 2022.02.19
 * 수정일: 2022.03.02
 */

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

    // AnimatedPresence가 SSR에서 읽힐 때 경고문이 발생하는 데 이를 방지하기 위해 컴포넌트가 마운트 되기 전에는 아무것도 반환하지 않게함
    const [isLoaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!isLoaded) {
        return <></>;
    }

    return (
        <Link href={openChatLink}>
            <a target="_blank">
                <motion.div
                    className={`
                        flex h-12
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
                                className={`
                                flex flex-col items-center justify-center
                                bg-sopa-pure p-2
                                rounded-r-lg text-xs
                            `}
                            >
                                {openChatLink}
                                <p
                                    className={`
                                        flex items-center font-bold text-sm h-full
                                    `}
                                >
                                    카카오 오픈채팅 바로가기
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                    </svg>
                                </p>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </motion.div>
            </a>
        </Link>
    )
}