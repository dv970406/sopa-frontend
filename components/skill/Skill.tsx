/**
 * 생성일: 2022.02.11
 * 수정일: 2022.02.24
 */

import { motion } from 'framer-motion'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { selectedSkillsState, selectedSkillsToUploadState, skillsState } from '@utils/atoms'

interface ISkillInfo {
    uploadMode?: boolean;
    index: number;
    skill: string;
    skillImage: string;
    position: string;
    isSelected: boolean;
}

const skillVar = {
    hover: {
        scale: 1.1,
        transition: {
            duration: 0.3
        }
    }
}


function Skill({ uploadMode = false, index, position, skill, skillImage, isSelected }: ISkillInfo) {
    const setSelectedSkills = useSetRecoilState(selectedSkillsState)
    const setSkills = useSetRecoilState(skillsState)
    const setSelectedSkillsToUpload = useSetRecoilState(selectedSkillsToUploadState)

    const onClick = () => {
        if (uploadMode) {
            setSelectedSkillsToUpload(prev => {
                const newSelectedSkill = {
                    skill,
                    skillImage,
                    isSelected: true,
                    position
                }
                const targetIndex = prev.findIndex(item => item.skill === newSelectedSkill.skill)
                const copiedPrev = [...prev]

                if (targetIndex !== -1) copiedPrev.splice(targetIndex, 1)
                else copiedPrev.splice(-1, 0, newSelectedSkill)

                return [
                    ...copiedPrev
                ]
            })
        } else {
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
        }
        // SkillBoard에서 선택하면 skillsState의 isSelect를 true로 바꾼다.
        setSkills(prev => {
            const selectedSkill = {
                skill,
                skillImage,
                isSelected: !isSelected,
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
                flex m-3
                justify-center items-center
                cursor-pointer
                group
            `}
            onClick={() => onClick()}
            layoutId={uploadMode ? undefined : skill}
            variants={skillVar}
            whileHover="hover"
        >
            <img
                src={skillImage}
                className={`
                    w-14 h-14
                    ${isSelected ? "opacity-100" : uploadMode ? "opacity-30" : "opacity-100"}
                    transition-opacity
                `}
            />
            <motion.p
                className={`
                    hidden group-hover:block
                    absolute -bottom-3
                    bg-fuchsia-200 
                    p-1 rounded-md
                    text-xs tracking-wider
                `}
            >
                {skill}
            </motion.p>
        </motion.div>
    )
}

export default React.memo(Skill)