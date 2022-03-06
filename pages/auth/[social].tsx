/**
 * 생성일: 2022.02.17
 * 수정일: 2022.03.05
 */

import MainLayout from '@components/shared/MainLayout';
import { tokenState } from '@utils/atoms';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

interface ISocialLogin {
    token: string;
};

export default function SocialLogin({ token }: ISocialLogin) {
    const setToken = useSetRecoilState(tokenState);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (token) {
            //document.cookie = `TOKEN=${token}`;
            localStorage.setItem("TOKEN", token);
            setToken(token);
            router.push("/");
        };
        setLoading(false);
    }, [router, token, setToken]);
    return (
        <MainLayout loading={loading} title="소셜로그인">

        </MainLayout>
    );
};

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    const { code, social } = query;
    const response = await fetch(`${process.env.APOLLO_EXPRESS_URI}/sociallogin/${social}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ code })
    });

    const { jwtToken } = await response.json();
    return {
        props: {
            token: jwtToken
        }
    };
};