/**
 * 생성일: 2022.02.24
 * 수정일: 2022.02.25
 */

import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRef } from 'react';

export default function NoExistsPage() {
    const neverGoOutBox = useRef(null);
    return (
        <div
            className="h-screen w-screen flex items-center justify-center overflow-hidden"
            ref={neverGoOutBox}
        >
            <Head>
                <title>404 NOT FOUND!</title>
            </Head>
            <motion.div
                className='w-64 h-64 space-y-3 flex flex-col items-center'
            >
                <motion.img
                    drag
                    dragConstraints={neverGoOutBox}
                    dragElastic={1}
                    src="/sopa.png"
                    className="cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                />
                <p className='text-xl'>존재하지 않는 페이지입니다</p>
                <Link href="/">
                    <a>
                        <p className="text-2xl text-sopa-accent">홈으로 가기 &rarr;</p>
                    </a>
                </Link>
            </motion.div>
        </div>
    )
}