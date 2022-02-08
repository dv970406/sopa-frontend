/**
 * 생성일: 2022.02.08
 * 수정일: ------
 */

interface IDivider {
    text: string;
}

export default function Divider({ text }: IDivider) {
    return (
        <div
            className={`
                flex space-x-1
                my-4
                items-center justify-center
                text-center
            `}
        >
            <div className='h-[2px] bg-fuchsia-300 w-full rounded-full' />
            <div className='text-fuchsia-400 w-full font-bold'>{text}</div>
            <div className='h-[2px] bg-fuchsia-300 w-full rounded-full' />
        </div>
    )
}