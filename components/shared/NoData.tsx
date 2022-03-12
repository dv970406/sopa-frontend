/**
 * 생성일: 2022.03.05
 * 수정일: ------
 */

import Image from 'next/image';

// SearchPosts의 결과가 없을 때, profile에서 데이터가 없을 때 사용할 Component
export default function NoData() {
    return (
        <div
            className="
                flex flex-col items-center justify-start rounded-full 
                h-screen space-y-2
            "
        >
            <Image
                src="/sopa.png"
                alt="소파"
                width={200}
                height={200}
                quality={100}
            />
            <p className="font-bold text-lg">데이터가 없습니다!</p>
        </div>
    );
};