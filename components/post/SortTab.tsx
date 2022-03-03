/**
 * 생성일: 2022.02.24
 * 수정일: 2022.03.03
 */

interface ISortTab {
    tabName: string | JSX.Element;
    selectedTab: string;
    comparisonTarget: string;
    onClick(): void;
}

export default function SortTab({ tabName, selectedTab, comparisonTarget, onClick }: ISortTab) {
    return (
        <div
            className={`
                border-b-4 flex items-center justify-center space-x-2
                p-3 w-full hover:border-b-sopa-default transition-colors
                cursor-pointer font-bold text-xs sm:text-sm md:text-lg
                tracking-widest
                ${comparisonTarget === selectedTab ? "border-b-sopa-accent" : "border-b-sopa-soft"}
            `}
            onClick={onClick}
        >
            {tabName}
        </div>
    )
}