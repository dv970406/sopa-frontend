/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.12
 */

import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../../utils/atoms';
import Button from './Button';

function NavBar() {
    const token = useRecoilValue(tokenState)
    const router = useRouter();
    const goToLogin = () => router.push("/auth");

    return (
        <div className='
            flex justify-around items-center px-10 h-20 shadow-xl absolute top-0 w-full
            bg-fuchsia-400 rounded-b-md
        '>
            <div className='w-8 h-8 rounded-full bg-slate-600' />
            <div
                className={`
                    flex items-center
                    space-x-3
                `}
            >
                <div onClick={token ? () => alert("will go post upload") : goToLogin}>
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