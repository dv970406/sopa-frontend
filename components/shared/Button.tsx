/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.20
 */

interface IButton {
    text: string;
    onClick?(): void;
};

export default function Button({ text, onClick }: IButton) {
    return (
        <button
            className="
                flex justify-center items-center
                bg-fuchsia-400 opacity-60
                hover:opacity-100 transition
                rounded-lg px-4 py-2
            "
            onClick={onClick}
        >
            <span className='font-bold text-white'>
                {text}
            </span>
        </button>

    )
}