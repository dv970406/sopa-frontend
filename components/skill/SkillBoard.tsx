/**
 * 생성일: 2022.02.11
 * 수정일: 2022.02.24
 */

import { ISkill } from '@utils/types/interfaces'
import React from 'react'
import Skill from './Skill'

interface ISkillBoard {
    skillsOfPosition: ISkill[]
}

function SkillBoard({ skillsOfPosition }: ISkillBoard) {
    return (
        <div
            className={`
                relative flex flex-col items-center border-2 border-black shadow-lg rounded-lg 
            `}
        >
            <p
                className={`
                    absolute -top-3 px-3 py-1 rounded-md
                    bg-fuchsia-300
                `}
            >
                {skillsOfPosition[0].position}
            </p>
            <div
                className={`
                    flex flex-row flex-wrap justify-center 
                    w-full h-1/3 px-3 py-6 
                `}
            >
                {skillsOfPosition?.map((skill, index) => <Skill key={skill.skill} index={index} {...skill} />)}
            </div>
        </div>
    )
}

export default React.memo(SkillBoard)