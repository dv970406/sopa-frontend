/**
 * 생성일: 2022.02.24
 * 수정일: 2022.03.05
 */

interface ISortTabComponent {
    tabName: string | JSX.Element;
    selectedTab: string;
    comparisonTarget: string;
    onClick(): void;
};

export default function SortTab({ tabName, selectedTab, comparisonTarget, onClick }: ISortTabComponent) {
    return (
        <div
            className={`
                flex items-center justify-center 
                w-full p-3 space-x-2
                text-xs font-bold border-b-4 ${comparisonTarget === selectedTab ? "border-b-sopa-accent" : "border-b-sopa-soft"}
                sm:text-sm md:text-lg
                hover:border-b-sopa-default 
                transition-colors cursor-pointer tracking-widest
            `}
            onClick={onClick}
        >
            {tabName}
        </div>
    );
};