/**
 * 생성일: 2022.02.11
 * 수정일: ------
 */

import { ISkill } from '../../utils/atoms'
import DraggableSkill from './DraggableSkill'

interface ISkillBoard {
    position: string;
    skillOfPosition: ISkill[]
}

export default function SkillBoard({ position, skillOfPosition }: ISkillBoard) {
    return (
        <>
            <p>{position}</p>
            <div
                className={`
                        w-full h-1/3 px-3 py-6 shadow-lg rounded-lg border-2 border-black
                        flex flex-row flex-wrap justify-center mx-auto
                    `}
            >
                {skillOfPosition?.map((skill, index) => <DraggableSkill key={skill.skill} index={index} {...skill} />)}
            </div>
        </>
    )
}