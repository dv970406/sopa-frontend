/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.05
 */

import { tokenState } from '@utils/atoms';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import NavBar from './NavBar';

interface IMainLayout {
    loading?: boolean;
    title: string;
    children: React.ReactNode;
};

export default function MainLayout({ loading, title, children }: IMainLayout) {
    const { pathname, push } = useRouter();
    const isAuthPage = pathname === "/auth";
    const neededLoginPage = pathname === "/post/upload" || pathname === "/user/profile" || pathname === "/user/edit";
    const usingFormPage = pathname === "/auth" || pathname === "/user/edit" || pathname === "/post/upload" || pathname === "/post/[id]";
    const token = useRecoilValue(tokenState);

    useEffect(() => {
        if (neededLoginPage === true) {
            token ? null : push("/auth");
        } else if (isAuthPage) {
            token ? push("/") : null;
        }
    }, [pathname]);
    return (
        <div
            className={`
                font-NotoSans select-none box-border
                dark:bg-dark-ultra dark:text-dark-text-color
            `}
        >
            <Head>
                <title>{title?.includes("undefined") || loading ? "SOPA" : `${title} | SOPA`} </title>
            </Head>
            {isAuthPage ? null : <NavBar />}
            <div
                className={`
                    flex flex-col justify-center 
                    ${isAuthPage ? "items-center" : ""}
                    ${usingFormPage ? "md:px-28 lg:px-52 xl:px-96 space-y-8" : "sm:px-16 md:px-24 lg:px-28 xl:px-48 space-y-8"}
                    py-14 px-8 
                `}
            >
                {children}
                {isAuthPage ? null : (
                    <footer
                        className="py-52"
                    />
                )}
            </div>
        </div>
    );
};