/**
 * 생성일: 2022.02.24
 * 수정일: 2022.03.01
 */

import { motion, useMotionValue, useTransform } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function NoExistsPage() {
    const neverGoOutBox = useRef(null);
    const x = useMotionValue(0);
    const getScreenWidth = typeof window === "undefined" ? null : document?.body?.clientWidth;
    const halfSizeWidth = getScreenWidth! / 2;
    const xToOpacity = useTransform(x, [-halfSizeWidth, halfSizeWidth * (9.5 / 10), halfSizeWidth], [1, 1, 0])
    const router = useRouter();

    useEffect(() => {
        x.onChange(() => {
            if (getScreenWidth! * (1 / 2) < x.get()) {
                router.push("/");
            }
        })
    }, [x])
    return (
        <div
            className="h-screen w-screen flex items-center justify-center overflow-hidden space-x-7"
            ref={neverGoOutBox}
        >
            <Head>
                <title>404 NOT FOUND!</title>
            </Head>
            <motion.div
                className='w-48 h-48 space-y-3 flex flex-col items-center'
            >
                <motion.img
                    drag='x'
                    dragConstraints={neverGoOutBox}
                    dragElastic={1}
                    src="/sopa.png"
                    className="cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    style={{
                        x,
                        opacity: xToOpacity
                    }}
                />
            </motion.div>
            <motion.div
                className='text-xl flex items-center space-x-3'
                initial={{
                    x: -200,
                    opacity: 0
                }}
                animate={{
                    x: 0,
                    opacity: 1
                }}
                transition={{
                    duration: 0.7
                }}
            >
                <p>소파를 강하게 슬라이드 해서 집으로 보내주세요!</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
            </motion.div>
        </div>
    )
}