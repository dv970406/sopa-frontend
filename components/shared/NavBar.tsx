/**
 * 생성일: 2022.02.08
 * 수정일: ------
 */

import { useRouter } from 'next/router';
import Button from './Button';

export default function NavBar() {
    const isLoggedIn = false;
    const router = useRouter();

    const goToLogin = () => router.push("/auth");

    return (
        <div className='
            flex justify-between items-center px-10 h-20 shadow-xl absolute top-0 w-full
        '>
            <div className='w-8 h-8 rounded-full bg-slate-600' />
            <div>
                {isLoggedIn ? (
                    "yes"
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