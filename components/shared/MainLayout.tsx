/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.10
 */

import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import NavBar from './NavBar';

interface IMainLayout {
    title: string;
    children: React.ReactNode;
}

export default function MainLayout({ title, children }: IMainLayout) {
    const { pathname } = useRouter();
    const loginOrSignUp = pathname === "/auth";

    return (
        <div
            className={
                `font-NotoSans text-md`
            }
        >
            {loginOrSignUp ? null : <NavBar />}
            <Head>
                <title>{title} | SOPA</title>
            </Head>
            <div
                className={
                    `
                        justify-center px-16 py-4 mt-28
                        ${loginOrSignUp ? "flex items-center" : ""}
                        w-full
                    `

                }
            >
                {children}
            </div>
        </div>
    )
}