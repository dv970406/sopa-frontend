/**
 * 생성일: 2022.02.22
 * 수정일: ------
 */

export default function Tab({ count, tab, onFocusTab, setTab, svg }: any) {
    return (
        <div
            className='flex flex-col items-center space-y-1'
        >
            <button
                className={`
                    p-2 rounded-full border-4 border-fuchsia-300 hover:border-fuchsia-400 transition
                    ${tab === onFocusTab ? "text-white bg-fuchsia-500" : "text-fuchsia-500 bg-white"}
                `}
                onClick={() => setTab(onFocusTab)}
            >
                {svg}
            </button>
            <p>{count}개</p>
        </div>
    )
}