/**
 * 생성일: 2022.02.08
 * 수정일: ------
 */

import { clsName } from '../../utils/tailwindUtilFunc';

interface IButton {
    text: string;
    onClick(): void;
}

export default function Button({ text, onClick }: IButton) {
    return (
        <button
            className="
                flex justify-center items-center
                h-4 bg-fuchsia-500
                rounded-xl px-5 py-4 
            "
            onClick={onClick}
        >
            <span className='font-bold text-white'>
                {text}
            </span>
        </button>
    )
}