/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.17
 */

interface IFormButton {
    disabled: boolean;
    text: string;
    loading: boolean;
    onClick?(): void;
}

export default function FormButton({ disabled = false, text, loading, onClick }: IFormButton) {

    return (
        <button
            disabled={disabled}
            className={`
                flex items-center justify-center
                w-full h-4 bg-fuchsia-300 hover:${disabled ? "bg-fuchsia-300" : "bg-fuchsia-500 "}
                rounded-xl px-3 py-7
                focus:outline-none
                focus:ring-2 ring-offset-2 ring-fuchsia-500
                transition-colors
                shadow-md
                cursor-pointer
            `}
            onClick={onClick}
        >
            <span className='font-bold text-white'>
                {loading ? "처리중입니다.." : text}
            </span>
        </button>
    )
}