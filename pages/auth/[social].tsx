/**
 * 생성일: 2022.02.17
 * 수정일: 2022.03.14
 */

import Loading from '@components/shared/Loading';
import MainLayout from '@components/shared/MainLayout';
import { tokenState } from '@utils/atoms';
import { makeSocialLoginReqUrl } from '@utils/utilFunctions';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const SocialLogin: NextPage = () => {
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

        const { jwtToken, error } = await response.json();

        if (error) {
            const checkAgain = confirm(`${error} 다시 요청하시겠습니까?`);

            // 소셜로그인에 에러가 생겼을 때 재차 요청을 보내게 함
            checkAgain ? window.location.href = makeSocialLoginReqUrl({ socialSite: "naver", reprompt: true }) : router.replace("/");
            return;
        };

        if (jwtToken) {
            document.cookie = `TOKEN=${jwtToken}`;
            setToken(jwtToken);
            router.push("/");
        };
    }

    useEffect(() => {
        if (router) {
            getSocialLogin();
        }
    }, [router]);
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

export default SocialLogin;