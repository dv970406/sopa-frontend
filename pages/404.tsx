/**
 * 생성일: 2022.02.24
 * 수정일: ------
 */

import Link from 'next/link';

export default function NoExistsPage() {
    return (
        <div
            className="h-screen w-screen flex items-center justify-center"
        >
            <div
                className='w-64 h-64 space-y-3 flex flex-col items-center'
            >
                <img src="/sopa.png" />
                <p className='text-xl'>존재하지 않는 페이지입니다</p>
                <Link href="/">
                    <a>
                        <p className="text-2xl text-fuchsia-500">홈으로 가기 &rarr;</p>
                    </a>
                </Link>
            </div>
        </div>
    )
}