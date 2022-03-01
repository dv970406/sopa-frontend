/**
 * 생성일: 2022.02.14
 * 수정일: 2022.03.01
 */

import ArrangementTab from '@components/post/ArrangementTab';
import Skill from '@components/skill/Skill';
import { selectedPositionState, skillsOfPositionSelector } from '@utils/atoms';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function PositionSelector() {
    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState)
    const skillsOfPosition = useRecoilValue(skillsOfPositionSelector)

    useEffect(() => {
        setSelectedPosition("frontend")
    }, [])

    return (
        <div>
            <div
                className="flex items-center justify-around"
            >
                <div
                    className="flex items-center w-24"
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
                    className="flex justify-around space-x-4 ml-7 w-full"
                >
                    <ArrangementTab
                        comparisonTarget={selectedPosition}
                        onClick={() => setSelectedPosition("frontend")}
                        tabName="frontend"
                        selectedTab='frontend'
                    />
                    <ArrangementTab
                        comparisonTarget={selectedPosition}
                        onClick={() => setSelectedPosition("backend")}
                        tabName="backend"
                        selectedTab='backend'
                    />
                    <ArrangementTab
                        comparisonTarget={selectedPosition}
                        onClick={() => setSelectedPosition("app")}
                        tabName="app"
                        selectedTab='app'
                    />
                </div>
            </div>
            <div
                className={`
                    flex flex-wrap
                    justify-center mt-6
                `}
            >
                {skillsOfPosition.map((skill, index) =>
                    <Skill uploadMode={true} key={index} index={index} {...skill} />
                )}
            </div>
        </div>
    )
}