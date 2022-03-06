/**
 * 생성일: 2022.02.17
 * 수정일: 2022.03.06
 */

import Loading from '@components/shared/Loading';
import MainLayout from '@components/shared/MainLayout';
import { tokenState } from '@utils/atoms';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export default function SocialLogin() {
    const setToken = useSetRecoilState(tokenState);
    const router = useRouter();

    const getSocialLogin = async () => {
        const { code, social } = router.query;
        const response = await fetch(`${process.env.NEXT_PUBLIC_APOLLO_EXPRESS_URI}/sociallogin/${social}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ code })
        });

        const { jwtToken } = await response.json();

        if (jwtToken) {
            localStorage.setItem("TOKEN", jwtToken);
            setToken(jwtToken);
            router.push("/");
        };
    }

    useEffect(() => {
        getSocialLogin();
    });
    return (
        <MainLayout title='소셜로그인'>
            <div
                className="w-screen h-screen"
            >
                <Loading />
            </div>
        </MainLayout>
    );
};
