/**
 * 생성일: 2022.02.11
 * 수정일: 2022.02.14
 */

import React from 'react'
import { ISkill } from '@utils/atoms'
import Skill from './Skill'

interface ISkillBoard {
    skillOfPosition: ISkill[]
}

function SkillBoard({ skillOfPosition }: ISkillBoard) {
    return (
        <>
            <p>{skillOfPosition[0].position}</p>
            <div
                className={`
                    flex flex-row flex-wrap justify-center 
                    w-full h-1/3 px-3 py-6 shadow-lg rounded-lg border-2 border-black
                `}
            >
                {skillOfPosition?.map((skill, index) => <Skill key={skill.skill} index={index} {...skill} />)}
            </div>
        </>
    )
}

export default React.memo(SkillBoard)