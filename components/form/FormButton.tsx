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
                flex items-center justify-center rounded-xl
                w-full h-4 px-3 py-7
                ${disabled ? "bg-sopa-pure" : "bg-sopa-accent"} 
                focus:ring-2 ring-offset-2 ring-sopa-accent focus:outline-none
                transition-colors shadow-md cursor-pointer
            `}
            onClick={onClick}
        >
            <span className='font-bold text-white'>
                {loading ? "처리중입니다.." : text}
            </span>
        </button>
    )
}