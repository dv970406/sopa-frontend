/**
 * 생성일: 2022.02.24
 * 수정일: 2022.02.25
 */

import { ReactElement } from 'react';

interface ISortingTab {
    tabName: string | ReactElement;
    selectedTab: string;
    comparisonTarget: string;
    onClick(): void;
}

export default function SortingTab({ tabName, selectedTab, comparisonTarget, onClick }: ISortingTab) {

    return (
        <div
            className={`
                border-b-4 flex items-center justify-center space-x-2
                p-3 w-full hover:border-b-fuchsia-400 transition-colors
                cursor-pointer text-sm md:text-lg
                ${comparisonTarget === selectedTab ? "border-b-fuchsia-500" : "border-b-fuchsia-200"}
            `}
            onClick={onClick}
        >
            {tabName}
        </div>
    )
}