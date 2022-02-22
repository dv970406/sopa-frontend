/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.22
 */

import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import NavBar from './NavBar';

interface IMainLayout {
    loading?: boolean;
    title: string;
    children: React.ReactNode;
}

export default function MainLayout({ loading, title, children }: IMainLayout) {
    const { pathname } = useRouter();
    const loginOrSignUp = pathname === "/auth";
    return (
        <div
            className={`
                font-NotoSans text-md select-none
            `}
        >
            {loginOrSignUp ? null : <NavBar />}
            <Head>
                <title>{title?.includes("undefined") || loading ? "SOPA" : `${title} | SOPA`} </title>
            </Head>
            <div
                className={`
                    flex flex-col
                    justify-center py-16 px-6 mt-16
                    ${loginOrSignUp ? "flex items-center" : ""}
                    w-full
                `}
            >
                {children}
            </div>
        </div>
    )
}