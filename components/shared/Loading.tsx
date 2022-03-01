/**
 * 생성일: 2022.02.24
 * 수정일: 2022.03.01
 */

import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <motion.div
            className="place-self-center top-1/2 "
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
    )
}
