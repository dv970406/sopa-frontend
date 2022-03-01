/**
 * 생성일: 2022.02.22
 * 수정일: 2022.03.01
 */

import { myActivitiesTabState } from '@utils/atoms'
import type { kindOfMyActivitiesTab } from '@utils/types/types';
import { useRecoilState } from 'recoil'

interface ITabComponent {
    autoFocus?: boolean;
    count: number;
    onFocusTab: kindOfMyActivitiesTab;
    svg: JSX.Element;
}

export default function ProfileTab({ autoFocus, count, onFocusTab, svg }: ITabComponent) {
    const [myActivitiesTab, setMyActivitiesTab] = useRecoilState(myActivitiesTabState);
    return (
        <div
            className='
                flex flex-col items-center space-y-1
            '
        >
            <button
                className={`
                    p-2 rounded-full border-4 border-sopa-pure hover:border-sopa-default transition
                    ${myActivitiesTab === onFocusTab ? (
                        "text-white bg-sopa-accent ring-2 ring-sopa-accent ring-offset-2"
                    ) : (
                        "text-sopa-accent bg-white"
                    )}
                    focus:outline-none
                `}
                autoFocus={autoFocus}
                onClick={() => setMyActivitiesTab(onFocusTab)}
            >
                {svg}
            </button>
            <p>{count}개</p>
        </div>
    )
}