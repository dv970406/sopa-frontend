/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.01
 */

import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { tokenState } from '@utils/atoms';
import useMyInfo from 'hooks/useMyInfo';
import SearchPostsBtn from '@components/post/search/SearchPostsBtn';
import LoginHoverEvent from './LoginHoverEvent';


function NavBar() {
    const token = useRecoilValue(tokenState);
    const { seeMyInfo } = useMyInfo();

    const router = useRouter();
    const isHomePage = router.route === "/";
    const isMyProfilePage = router.route === "/user/profile";

    const goToLogin = () => router.push("/auth");
    const goToCreatePost = () => router.push("/post/upload");
    const goToSeeMyProfile = () => router.push(`/user/profile`);
    const goToEditUser = () => router.push("/user/edit");

    return (
        <div
            className="
                flex justify-around items-center top-0 rounded-b-3xl
                w-full h-24 px-10
                shadow-md
            "
        >
            <div
                onClick={() => router.push("/")}
                className="
                    rounded-full
                    w-16 h-16
                    border-opacity-50 
                    hover:scale-110 
                    transition cursor-pointer
                "
            >
                <img src="/sopa.png" className="w-full h-full" />
            </div>

            <div
                className={`
                    flex items-center
                    space-x-8
                `}
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
                            className="
                                font-bold text-sopa-default text-lg
                                hover:text-sopa-accent 
                                transition
                            "
                            onClick={goToEditUser}
                        >
                            {`${seeMyInfo?.name} 수정`}
                        </button>
                    ) : (
                        <button
                            className="
                                font-bold text-sopa-default text-lg 
                                hover:text-sopa-accent 
                                transition 
                            "
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
    )
}

export default NavBar