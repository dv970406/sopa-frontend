/**
 * 생성일: 2022.02.14
 * 수정일: ------
 */

import Skill from '@components/home/Skill';
import { KindOfPosition, selectedPositionState, selectedSkillsState, skillsOfPositionSelector, skillsState } from '@utils/atoms';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

export default function PositionSelector() {
    const setSelectedPosition = useSetRecoilState(selectedPositionState)
    const skillsOfPosition = useRecoilValue(skillsOfPositionSelector)
    const resetSkills = useResetRecoilState(skillsState)
    const resetSelectedSkills = useResetRecoilState(selectedSkillsState)

    console.log(skillsOfPosition)
    const changePosition = (event: React.FormEvent<HTMLSelectElement>) => {
        const { value } = event.currentTarget;
        setSelectedPosition(value as KindOfPosition);
    }

    useEffect(() => {
        resetSkills()
        resetSelectedSkills()
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