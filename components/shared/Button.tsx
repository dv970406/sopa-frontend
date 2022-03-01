/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.22
 */

interface IButton {
    text: string;
    onClick?(): void;
};

export default function Button({ text, onClick }: IButton) {
    return (
        <button
            className="
                flex justify-center items-center bg-sopa-pure hover:bg-sopa-default transition text-white font-bold rounded-lg px-3 py-2
            "
            onClick={onClick}
        >
            <span className='font-bold text-white'>
                {text}
            </span>
        </button>

    )
}