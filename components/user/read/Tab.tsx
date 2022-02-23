/**
 * 생성일: 2022.02.22
 * 수정일: 2022.02.23
 */

interface ITabComponent {
    autoFocus?: boolean;
    count: number;
    tab: string;
    setTab: any;
    onFocusTab: string;
    svg: JSX.Element;
}

export default function Tab({ autoFocus, count, tab, onFocusTab, setTab, svg }: ITabComponent) {
    return (
        <div
            className='flex flex-col items-center space-y-1'
        >
            <button
                className={`
                    p-2 rounded-full border-4 border-fuchsia-300 hover:border-fuchsia-400 transition
                    ${tab === onFocusTab ? (
                        "text-white bg-fuchsia-500 ring-2 ring-fuchsia-500 ring-offset-2"
                    ) : (
                        "text-fuchsia-500 bg-white"
                    )}
                    focus:outline-none
                `}
                autoFocus={autoFocus}
                onClick={() => setTab(onFocusTab)}
            >
                {svg}
            </button>
            <p>{count}개</p>
        </div>
    )
}