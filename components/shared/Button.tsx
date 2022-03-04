/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.02
 */

interface IButton {
    text: string;
    onClick?(): void;
};

export default function Button({ text, onClick }: IButton) {
    return (
        <button
            className="
                flex justify-center items-center rounded-lg 
                px-3 py-2
                bg-sopa-default text-white font-bold
                hover:bg-sopa-ultra transition 
            "
            onClick={onClick}
        >
            <span className="font-bold text-white">
                {text}
            </span>
        </button>

    )
}