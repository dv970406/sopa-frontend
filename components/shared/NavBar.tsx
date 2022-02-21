/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.21
 */

import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { tokenState } from '@utils/atoms';
import useMyInfo from 'hooks/useMyInfo';
import SearchInputBtn from '@components/post/search/SearchInputBtn';


function NavBar() {
    const token = useRecoilValue(tokenState);
    const { seeMyProfile } = useMyInfo();

    const router = useRouter();
    const isHome = router.route === "/"

    const goToLogin = () => router.push("/auth");
    const goToCreatePost = () => router.push("/post/upload");
    const goToEditUser = () => router.push(`/user/${seeMyProfile?.id}`);

    return (
        <div className='
            flex justify-around items-center px-10 h-20 shadow-xl absolute top-0 w-full
            bg-fuchsia-400 rounded-b-md
        '>
            <div onClick={() => router.push("/")} className='w-8 h-8 rounded-full bg-slate-600' />

            <div
                className={`
                    flex items-center
                    space-x-3
                `}
            >
                {isHome ? (
                    <SearchInputBtn />
                ) : null}
                <div
                    className={`
                        cursor-pointer
                    `}
                    onClick={token ? goToCreatePost : goToLogin}
                >
                    글 쓰기
                </div>
                {token ? (
                    <button
                        className={`
                            opacity-70 hover:opacity-100 transition
                            font-bold text-white
                        `}
                        onClick={goToEditUser}
                    >
                        프로필
                    </button>
                ) : (
                    <button
                        className={`
                            font-bold text-white
                        `}
                        onClick={goToLogin}
                    >
                        로그인
                    </button>
                )}
            </div>
        </div>
    )
}

export default NavBar