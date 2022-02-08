/**
 * 생성일: 2022.02.08
 * 수정일: ------
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
    const { pathname } = useRouter()
    const hideNavBarPath = pathname === "/login" || pathname === "/sign-up"
    return (
        <div>
            {hideNavBarPath ? null : <NavBar />}
            <Head>
                <title>{title} | SOPA</title>
            </Head>
            {children}
        </div>
    )
}