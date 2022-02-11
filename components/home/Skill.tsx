/**
 * 생성일: 2022.02.11
 * 수정일: ------
 */

import { motion } from 'framer-motion'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { selectedSkillsState, skillsState } from '../../utils/atoms'

interface IDraggableSkill {
    index: number;
    skill: string;
    skillImage: string;
    position: string;
    isSelected: boolean;
}

const skillVar = {
    start: {
        opacity: 0,
    },
    end: {
        opacity: 1,
        transition: {
            duration: 0.4
        }
    },
    hover: {
        scale: 1.1,
        transition: {
            duration: 0.3
        }
    }
}

function Skill({ index, position, skill, skillImage, isSelected }: IDraggableSkill) {
    const setSelectedSkills = useSetRecoilState(selectedSkillsState)
    const setSkills = useSetRecoilState(skillsState)

    const onClick = () => {
        // 만약 이미 선택된 skill이라면 바로 함수 종료
        if (isSelected) return;

        // SkillBoard에서 선택하면 selectedSillsState로 추가시킴
        setSelectedSkills(prev => {
            const newSelectedSkill = {
                skill,
                skillImage,
                isSelected: true,
                position
            }
            return [
                ...prev,
                newSelectedSkill
            ]
        })

        // SkillBoard에서 선택하면 skillsState의 isSelect를 true로 바꾼다.
        setSkills(prev => {
            const selectedSkill = {
                skill,
                skillImage,
                isSelected: true,
                position
            };

            const selectedPosition = [...prev[position]];
            return {
                ...prev,
                [position]: [
                    ...selectedPosition.slice(0, index),
                    selectedSkill,
                    ...selectedPosition.slice(index + 1)
                ]
            };
        })
    }
    return (
        <motion.div
            className={`
                flex flex-wrap m-3
                justify-center items-center
                cursor-pointer
                ${isSelected ? "opacity-20" : "opacity-100"}
            `}
            onClick={() => onClick()}
            layoutId={skill}
            variants={skillVar}
            whileHover="hover"
            initial="start"
            animate="end"

        >
            <motion.img
                src={`${skillImage}`}
                className={`
                    w-14 h-14
                `}
            />
        </motion.div>
    )
}

export default React.memo(Skill)