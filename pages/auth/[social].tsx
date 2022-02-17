/**
 * 생성일: 2022.02.17
 * 수정일: ------
 */

import { tokenState } from '@utils/atoms';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

interface ISocialLogin {
    token: string;
}

export default function SocialLogin({ token }: ISocialLogin) {
    const setToken = useSetRecoilState(tokenState);
    const router = useRouter();

    useEffect(() => {
        if (token) {
            //document.cookie = `TOKEN=${token}`;
            localStorage.setItem("TOKEN", token);
            setToken(token);
            router.push("/");
        }
    }, []);
    return (
        <div>
            <p>기다려 주시와용 홍홍</p>
        </div>
    )
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    const { code, social } = query;
    const response = await fetch(`http://localhost:4000/sociallogin/${social}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ code })
    })

    const { jwtToken } = await response.json();
    return {
        props: {
            token: jwtToken
        }
    }
}