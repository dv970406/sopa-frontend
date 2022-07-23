/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.14
 */

import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { tokenState } from '@utils/atoms';
import useMyInfo from 'hooks/useMyInfo';
import SearchPostsBtn from '@components/post/search/SearchPostsBtn';
import LoginHoverEvent from './LoginHoverEvent';
import React, { useEffect } from 'react';
import Image from 'next/image';

function NavBar() {
    const [token, setToken] = useRecoilState(tokenState);
    const { seeMyInfo } = useMyInfo();
    const router = useRouter();
    const isHomePage = router.pathname === "/";
    const isMyProfilePage = router.pathname === "/user/profile";

    const goToLogin = () => router.push("/auth");
    const goToCreatePost = () => router.push("/post/upload");
    const goToSeeMyProfile = () => router.push(`/user/profile`);
    const goToEditUser = () => router.push("/user/edit");

    useEffect(() => {
        // token state값이 변경될 때 마다 로컬 스토리지에 저장된 token을 set함
        setToken(document.cookie.split("TOKEN=")[1]);
    }, [token, setToken]);

    return (
        <div
            className="top-0 flex items-center justify-around w-full h-24 px-10 shadow-md rounded-b-3xl"
        >
            <div
                onClick={() => router.push("/")}
                className="w-16 h-16 transition border-opacity-50 rounded-full cursor-pointer hover:scale-110"
            >
                <Image
                    src="/sopa.png"
                    alt="소파"
                    width={70}
                    height={70}
                    quality={100}
                />
            </div>

            <div
                className="flex items-center space-x-8 "
            >
                {isHomePage ? (
                    <SearchPostsBtn />
                ) : null}

                <button
                    onClick={token ? goToCreatePost : goToLogin}
                    className="font-bold"
                >
                    글 쓰기
                </button>

                {token ? (
                    isMyProfilePage ? (
                        <button
                            className="text-lg font-bold transition text-sopa-default hover:text-sopa-accent"
                            onClick={goToEditUser}
                        >
                            {seeMyInfo?.name}
                        </button>
                    ) : (
                        <button
                            className="text-lg font-bold transition text-sopa-default hover:text-sopa-accent"
                            onClick={goToSeeMyProfile}
                        >
                            프로필
                        </button>
                    )
                ) : (
                    <LoginHoverEvent />
                )}
            </div>
        </div>
    );
};

// 사용중인 page에서 리렌더링이 일어난다고 해서 덩달아 리렌더링 되지 않게 한다.
export default React.memo(NavBar);