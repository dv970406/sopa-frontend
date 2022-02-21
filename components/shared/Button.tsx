/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.20
 */

import { buttonHoverEvent } from '@utils/tailwindFunctions';

interface IButton {
    text: string;
    onClick?(): void;
};

export default function Button({ text, onClick }: IButton) {
    return (
        <button
            className={buttonHoverEvent("fuchsia")}
            onClick={onClick}
        >
            <span className='font-bold text-white'>
                {text}
            </span>
        </button>

    )
}