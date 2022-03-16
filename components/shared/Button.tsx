/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.05
 */

interface IButtonComponent {
    text: string;
    onClick?: () => void;
    placeRight?: boolean;
};

export default function Button({ text, onClick, placeRight = false }: IButtonComponent) {
    return (
        <button
            className={`
                flex justify-center items-center rounded-lg 
                px-3 py-2
                bg-sopa-default text-white font-bold
                hover:bg-sopa-accent transition
                ${placeRight ? "ml-auto" : null}
            `}
            onClick={onClick}
        >
            <span className="font-bold text-white">
                {text}
            </span>
        </button>
    );
};