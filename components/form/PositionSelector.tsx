/**
 * 생성일: 2022.02.14
 * 수정일: 2022.02.15
 */

import Skill from '@components/home/Skill';
import { KindOfPosition, selectedPositionState, skillsOfPositionSelector } from '@utils/atoms';
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
            <label
                htmlFor="skills"
            >
                스킬
            </label>
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