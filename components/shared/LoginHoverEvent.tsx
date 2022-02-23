/**
 * 생성일: 2022.02.23
 * 수정일: ------
 */

import { useState } from 'react';
import SocialLogin from '@components/user/create/SocialLogin';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const loginTabVariants = {
    invisible: {
        x: 0,
        opacity: 0,
        scale: 0.2
    },
    visible: {
        x: -90,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
        }
    },
    exit: {
        x: -200,
        opacity: 0,
        scale: 0
    }
}

export default function LoginHoverEvent() {
    const router = useRouter();
    const [showSocialLogin, setShowSocialLogin] = useState(false);
    const goToLogin = () => router.push("/auth");

    return (
        <div
            onMouseEnter={() => setShowSocialLogin(true)}
            onMouseLeave={() => setShowSocialLogin(false)}
        >
            <button
                className={`
                    opacity-70 hover:opacity-100 font-bold text-white
                `}
                onClick={goToLogin}
            >
                로그인
            </button>
            <AnimatePresence>
                {showSocialLogin ? (
                    <motion.div
                        className={`
                            flex absolute space-x-3 
                            border-2 border-fuchsia-300 rounded-lg p-2 
                        `}
                        variants={loginTabVariants}
                        initial="invisible"
                        animate="visible"
                        exit="exit"
                    >
                        <SocialLogin social='naver' />
                        <SocialLogin social='github' />
                        <SocialLogin social='kakao' />
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    )
}