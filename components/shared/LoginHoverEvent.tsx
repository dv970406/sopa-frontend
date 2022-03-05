/**
 * 생성일: 2022.02.23
 * 수정일: 2022.03.05
 */

import { useEffect, useState } from 'react';
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
            duration: 0.3,
        }
    },
    exit: {
        x: -200,
        opacity: 0,
        scale: 0
    }
};

export default function LoginHoverEvent() {
    const router = useRouter();

    // 마우스 호버 여부에 따라 소셜로그인을 보여줄 지 분기 처리
    const [showSocialLogin, setShowSocialLogin] = useState(false);
    const goToLogin = () => router.push("/auth");

    // AnimatedPresence가 SSR에서 읽힐 때 경고문이 발생하는 데 이를 방지하기 위해 컴포넌트가 마운트 되기 전에는 아무것도 반환하지 않게함
    const [isLoaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!isLoaded) {
        return <></>;
    };

    return (
        <div
            onMouseEnter={() => setShowSocialLogin(true)}
            onMouseLeave={() => setShowSocialLogin(false)}
        >
            <button
                className="
                    font-bold text-sopa-accent 
                    hover:scale-110
                    transition
                "
                onClick={goToLogin}
            >
                로그인
            </button>
            <AnimatePresence>
                {showSocialLogin ? (
                    <motion.div
                        className="
                            flex absolute rounded-lg 
                            p-2 space-x-3 
                            bg-white shadow-md
                            dark:bg-dark-default
                        "
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
    );
};