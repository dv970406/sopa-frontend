/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.05
 */

interface IDivider {
    text: string;
};

export default function Divider({ text }: IDivider) {
    return (
        <div
            className={`
                flex items-center justify-center
                my-4 space-x-1
                text-center
            `}
        >
            <div className='rounded-full w-full h-[2px] bg-sopa-pure' />
            <div className='w-full text-sopa-default font-bold'>{text}</div>
            <div className='rounded-full w-full h-[2px] bg-sopa-pure' />
        </div>
    );
};