/**
 * 생성일: 2022.02.11
 * 수정일: 2022.03.02
 */

import type { ISkill } from '@utils/types/interfaces'
import React from 'react'
import Skill from './Skill'

interface ISkillBoard {
    skillsOfPosition: ISkill[]
}

// 메모이징으로 prop에 변화가 생기는 SkillBoard만 리렌더링
function SkillBoard({ skillsOfPosition }: ISkillBoard) {
    const BoardName = () => {
        switch (skillsOfPosition[0].position) {
            case "frontend":
                return "프론트엔드"
            case "backend":
                return "백엔드"
            case "app":
                return "앱"
        }
    }
    return (
        <div
            className={`
                relative flex flex-col items-center rounded-3xl bg-sopa-soft border-2 border-sopa-pure
                shadow-lg dark:bg-sopa-deepDark
            `}
        >
            <p
                className={`
                    absolute -top-3 px-8 py-1 rounded-md text-base
                    bg-sopa-accent text-white font-bold
                `}
            >
                {BoardName()}
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