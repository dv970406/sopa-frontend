/**
 * 생성일: 2022.02.11
 * 수정일: 2022.03.05
 */

import { motion } from 'framer-motion';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { selectedSkillsState, selectedSkillsToUploadState, skillsState } from '@utils/atoms';
import Image from 'next/image';

interface ISkillInfo {
    uploadMode?: boolean;
    index: number;
    name: string;
    skillImage: string;
    position: string;
    isSelected: boolean;
};

const skillVar = {
    hover: {
        scale: 1.1,
        transition: {
            duration: 0.3
        }
    }
};


// 해당 포지션 Board에 속해있는 Skill들 중 메모이징으로 변화가 생기는 Skill만 리렌더링
function Skill({ uploadMode = false, index, position, name, skillImage, isSelected }: ISkillInfo) {
    const setSelectedSkills = useSetRecoilState(selectedSkillsState);
    const setSkills = useSetRecoilState(skillsState);
    const setSelectedSkillsToUpload = useSetRecoilState(selectedSkillsToUploadState);

    const onClick = () => {
        if (uploadMode) {
            // 만약 CreatePost page라면 셀렉스킬업로드 state에 저장한다.
            setSelectedSkillsToUpload(prev => {
                const newSelectedSkill = {
                    name,
                    skillImage,
                    isSelected: true,
                    position
                };
                const targetIndex = prev.findIndex(item => item.name === newSelectedSkill.name);
                const copiedPrev = [...prev];

                if (targetIndex !== -1) copiedPrev.splice(targetIndex, 1);
                else copiedPrev.splice(-1, 0, newSelectedSkill);

                return [
                    ...copiedPrev
                ];
            });
        } else {
            // 스킬을 셀렉하면 셀렉스킬 state에 추가한다.
            setSelectedSkills(prev => {
                const newSelectedSkill = {
                    name,
                    skillImage,
                    isSelected: true,
                    position
                };

                return [
                    ...prev,
                    newSelectedSkill
                ];
            });
        };

        // 스킬을 선택하면 그 스킬의 isSelect를 true로 바꾼다.
        setSkills(prev => {
            const selectedSkill = {
                name,
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
        });
    };

    return (
        <motion.div
            className="
                group flex justify-center items-center 
                m-3
                cursor-pointer
            "
            onClick={() => onClick()}
            layoutId={uploadMode ? undefined : name}
            variants={skillVar}
            whileHover="hover"
        >
            <Image
                src={skillImage}
                alt={name}
                width={50}
                height={50}
                quality={100}
                placeholder="blur"
                blurDataURL={skillImage}
                className={`
                    ${isSelected ? "opacity-100" : uploadMode ? "opacity-30" : "opacity-100"}
                    transition-opacity
                `}
            />
            <motion.p
                className="
                    hidden group-hover:block absolute -bottom-3 rounded-md
                    py-1.5 px-2 
                    bg-sopa-default text-xs font-bold
                    dark:text-white
                    tracking-wider
                "
            >
                {name}
            </motion.p>
        </motion.div>
    );
};

export default React.memo(Skill);