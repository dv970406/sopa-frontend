/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.24
 */

import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { tokenState } from '@utils/atoms';
import useMyInfo from 'hooks/useMyInfo';
import SearchInputBtn from '@components/post/search/SearchInputBtn';
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
        <div className='
            flex justify-around items-center px-10 h-24 shadow-xl absolute top-0 w-full
            bg-fuchsia-400 rounded-b-md
        '>
            <div
                onClick={() => router.push("/")}
                className='
                    w-20 h-20 rounded-full border-opacity-50 cursor-pointer
                    hover:scale-110 transition
                '
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
                    <SearchInputBtn />
                ) : null}

                <button
                    onClick={token ? goToCreatePost : goToLogin}
                >
                    글 쓰기
                </button>

                {token ? (
                    isMyProfilePage ? (
                        <button
                            className="
                                opacity-70 hover:opacity-100 transition
                                font-bold text-white 
                            "
                            onClick={goToEditUser}
                        >
                            {`${seeMyInfo?.name} 수정`}
                        </button>
                    ) : (
                        <button
                            className="
                                opacity-70 hover:opacity-100 transition
                                font-bold text-white 
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