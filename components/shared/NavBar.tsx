/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.15
 */

import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { tokenState } from '@utils/atoms';
import Button from './Button';

function NavBar() {
    const token = useRecoilValue(tokenState)
    const router = useRouter();
    const goToLogin = () => router.push("/auth");
    const goToCreatePost = () => router.push("/post/upload");

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
                <div
                    className={`
                        cursor-pointer
                    `}
                    onClick={token ? goToCreatePost : goToLogin}
                >
                    글 쓰기
                </div>
                {token ? (
                    <Button
                        text="프로필"
                        onClick={() => null}
                    />
                ) : (
                    <Button
                        text="로그인"
                        onClick={goToLogin}
                    />
                )}
            </div>
        </div>
    )
}

export default NavBar