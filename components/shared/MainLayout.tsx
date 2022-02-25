/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.25
 */

import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Loading from './Loading';
import NavBar from './NavBar';

interface IMainLayout {
    loading?: boolean;
    title: string;
    children: React.ReactNode;
}

export default function MainLayout({ loading, title, children }: IMainLayout) {
    const { pathname } = useRouter();

    const loginOrSignUp = pathname === "/auth";

    /*  const scroll = async () => {
        // Infinite Scroll
        const scrollHeight = infiniteScrollBox?.current.scrollHeight;
        const scrollTop = infiniteScrollBox?.current.scrollTop;
        const clientHeight = infiniteScrollBox?.current.clientHeight;
        console.log(scrollHeight, scrollTop, clientHeight)
        if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
            // 페이지 끝에 도달하면 추가 데이터를 받아온다
            setFetching(true);
            await fetchMore();
            // 추가 데이터 로드 끝
            setFetching(false);
        };
    } */

    return (
        <div
            className={`
                font-NotoSans select-none
            `}
        >
            {loginOrSignUp ? null : <NavBar />}
            <Head>
                <title>{title?.includes("undefined") || loading ? "SOPA" : `${title} | SOPA`} </title>
            </Head>
            <div
                className={`
                    flex flex-col
                    justify-center py-16 px-8 sm:px-16 md:px-24 lg:px-40 xl:px-48
                    ${loginOrSignUp ? "flex items-center" : ""}
                    w-full
                `}
            >
                {loading ? (
                    <Loading />
                ) : children}
            </div>
        </div>
    )
}