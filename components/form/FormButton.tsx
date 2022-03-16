/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.05
 */

interface IFormButtonComponent {
    text: string;
    loading: boolean;
    onClick?: () => void;
};

export default function FormButton({ text, loading, onClick }: IFormButtonComponent) {
    return (
        <button
            disabled={loading}
            className={`
                flex items-center justify-center rounded-xl
                w-full h-4 px-3 py-7
                ${loading ? "bg-sopa-pure" : "bg-sopa-accent"} 
                focus:ring-2 ring-offset-2 ring-sopa-accent focus:outline-none
                transition-colors shadow-md cursor-pointer
            `}
            onClick={onClick}
        >
            <p className='font-bold text-white'>
                {loading ? "처리중입니다.." : text}
            </p>
        </button>
    );
};