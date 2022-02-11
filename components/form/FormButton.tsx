/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.11
 */

interface IFormButton {
    text: string;
    onClick(): void;
}

export default function FormButton({ text, onClick }: IFormButton) {
    return (
        <button
            className="
                flex items-center justify-center
                w-full h-4 bg-fuchsia-300 hover:bg-fuchsia-500 
                rounded-xl px-3 py-7
                focus:outline-none
                focus:ring-2 ring-offset-2 ring-fuchsia-500
                transition-colors
                shadow-md
            "
            onClick={onClick}
        >
            <span className='font-bold text-white'>
                {text}
            </span>
        </button>
    )
}