/**
 * 생성일: 2022.02.14
 * 수정일: 2022.03.03
 */

import SortTab from '@components/post/SortTab';
import Skill from '@components/skill/Skill';
import { selectedPositionState, skillsOfPositionSelector } from '@utils/atoms';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function UploadSkillsSelector() {
    // selector를 이용하여 셀렉한 포지션이 바뀔 때마다 포지션별 스킬셋들을 return하게 함
    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState);
    const skillsOfPosition = useRecoilValue(skillsOfPositionSelector);

    // 초기 포지션은 frontend로 시작
    useEffect(() => {
        setSelectedPosition("frontend");
    }, []);

    return (
        <div>
            <div
                className="flex items-center justify-around"
            >
                <div
                    className="
                        flex items-center
                        w-24
                    "
                >
                    <label
                        className="font-bold"
                    >
                        스킬
                    </label>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1 text-sopa-accent"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>
                <div
                    className="
                        flex justify-around 
                        w-full space-x-4 ml-7
                    "
                >
                    <SortTab
                        comparisonTarget={selectedPosition}
                        onClick={() => setSelectedPosition("frontend")}
                        tabName="프론트엔드"
                        selectedTab='frontend'
                    />
                    <SortTab
                        comparisonTarget={selectedPosition}
                        onClick={() => setSelectedPosition("backend")}
                        tabName="백엔드"
                        selectedTab='backend'
                    />
                    <SortTab
                        comparisonTarget={selectedPosition}
                        onClick={() => setSelectedPosition("app")}
                        tabName="앱"
                        selectedTab='app'
                    />
                </div>
            </div>
            <div
                className={`
                    flex flex-wrap justify-center rounded-lg
                    mt-6
                    dark:bg-dark-default
                `}
            >
                {skillsOfPosition.map((skill, index) =>
                    <Skill uploadMode={true} key={index} index={index} {...skill} />
                )}
            </div>
        </div>
    )
}