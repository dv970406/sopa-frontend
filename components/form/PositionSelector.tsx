/**
 * 생성일: 2022.02.14
 * 수정일: 2022.02.24
 */

import Skill from '@components/skill/Skill';
import { selectedPositionState, skillsOfPositionSelector } from '@utils/atoms';
import { KindOfPosition } from '@utils/types/types';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export default function PositionSelector() {
    const setSelectedPosition = useSetRecoilState(selectedPositionState)
    const skillsOfPosition = useRecoilValue(skillsOfPositionSelector)


    const changePosition = (event: React.FormEvent<HTMLSelectElement>) => {
        const { value } = event.currentTarget;
        setSelectedPosition(value as KindOfPosition);
    }

    useEffect(() => {
        setSelectedPosition("frontend")
    }, [])

    return (
        <div>
            <div
                className="flex items-center"
            >
                <label
                    htmlFor="skills"
                >
                    스킬
                </label>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1 text-fuchsia-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <select
                    id="skills"
                    onInput={changePosition}
                    className={`
                        ml-3 border-fuchsia-300 border-2 rounded-md focus:outline-none
                        px-2
                    `}
                >
                    <option>frontend</option>
                    <option>backend</option>
                    <option>app</option>
                </select>
            </div>
            <div
                className={`
                    flex flex-wrap
                    justify-center
                `}
            >
                {skillsOfPosition.map((skill, index) =>
                    <Skill uploadMode={true} key={index} index={index} {...skill} />
                )}
            </div>
        </div>
    )
}