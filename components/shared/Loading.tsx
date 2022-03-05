/**
 * 생성일: 2022.02.24
 * 수정일: 2022.03.05
 */

import { motion } from 'framer-motion';

// 로딩 중일 때 쓸 Component
export default function Loading() {
    return (
        <motion.div
            className="flex justify-center items-center place-self-center top-1/2 "
            initial={{
                rotate: -60
            }}
            animate={{
                rotate: 180,
            }}
            transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
                delay: 0.5
            }}
        >
            <motion.img
                src="/sopa.png"
                className="rounded-full w-40 h-40"
            />
        </motion.div>
    );
};
