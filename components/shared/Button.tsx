/**
 * 생성일: 2022.02.08
 * 수정일: ------
 */

import { clsName } from '../../utils/tailwindUtilFunc';

interface IButton {
    isFull: boolean;
}

export default function Button({ isFull }: IButton) {
    return (
        <button className={
            clsName(
                isFull ? "w-full" : "w-10",
                "h-4 bg-fuchsia-600 rounded-xl px-3 py-2",
            )
        }>
            <span className='font-bold text-white'>
                로그인
            </span>
        </button>
    )
}