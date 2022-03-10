/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.10
 */

import { tokenState } from '@utils/atoms';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import NavBar from './NavBar';

interface IMainLayout {
    title: string;
    children: React.ReactNode;
};

export default function MainLayout({ title, children }: IMainLayout) {
    const { pathname, push } = useRouter();
    const isAuthPage = pathname === "/auth" || pathname === "/auth/[social]";
    const neededLoginPage = pathname === "/post/upload" || pathname === "/user/profile" || pathname === "/user/edit";
    const usingFormPage = pathname === "/auth" || pathname === "/user/edit" || pathname === "/post/upload" || pathname === "/post/[id]";
    const token = useRecoilValue(tokenState);

    useEffect(() => {
        if (neededLoginPage === true) {
            token ? null : push("/");
        } else if (isAuthPage) {
            token ? push("/") : null;
        }
    }, [pathname, isAuthPage, neededLoginPage, token, push]);
    return (
        <div>
            <Head>
                <title>{title?.includes("undefined") || undefined ? "SOPA" : `${title} | SOPA`} </title>
            </Head>
            {isAuthPage ? null : <NavBar />}
            <div
                className={`
                    flex flex-col justify-center 
                    ${isAuthPage ? "items-center" : ""}
                    ${usingFormPage ? "md:px-28 lg:px-52 xl:px-96 space-y-8" : "sm:px-16 md:px-24 lg:px-28 xl:px-48 space-y-8"}
                    pt-14 pb-20 px-8 
                `}
            >
                {children}
            </div>
        </div>
    );
};