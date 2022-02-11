/**
 * 생성일: 2022.02.11
 * 수정일: ------
 */

import { motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { ISkill, selectedSkillsState, skillsState } from '../../utils/atoms';

interface ISelectedSkillBoard {
    selectedSkills: ISkill[]
}

export default function SelectedSkillBoard({ selectedSkills }: ISelectedSkillBoard) {
    const setSelectedSkills = useSetRecoilState(selectedSkillsState);
    const setSkills = useSetRecoilState(skillsState);

    const onClick = (selectedSkill: ISkill, index: number): void => {
        // SelectedSkillBoard에서 선택하면 selectedSkillsState에서 값을 삭제함
        setSelectedSkills(prev => {
            const copiedPrev = [...prev];
            copiedPrev.splice(index, 1);
            console.log(copiedPrev)
            return [
                ...copiedPrev
            ]
        })

        // SelectedSkillBoard에서 선택하면 skillsState로 다시 추가시킴
        setSkills(prev => {
            const skillsOfCopiedPosition = [...prev[selectedSkill.position]];

            const targetIndex = skillsOfCopiedPosition.findIndex(skill => skill.skill === selectedSkill.skill);

            const unSelect = {
                ...selectedSkill,
                isSelected: false
            };

            skillsOfCopiedPosition.splice(targetIndex, 1);
            skillsOfCopiedPosition.splice(targetIndex, 0, unSelect);
            return {
                ...prev,
                [selectedSkill.position]: skillsOfCopiedPosition,
            }
        })
    }

    return (
        <motion.div
            className={`
                w-full
                flex flex-wrap mt-10
                rounded-lg shadow-xl border-2 border-fuchsia-400 bg-fuchsia-300
                px-6 py-4
                
            `}
            layout
        >
            {selectedSkills?.map((selectedSkill, index) =>
                <motion.div
                    key={selectedSkill.skill}
                    className={`
                        flex flex-wrap m-3
                        justify-center items-center
                        cursor-pointer
                    `}
                    onClick={() => onClick(selectedSkill, index)}
                    layoutId={selectedSkill.skill}
                >
                    <img
                        src={`${selectedSkill.skillImage}`}
                        className={`
                        w-14 h-14
                        
                    `}
                    />
                </motion.div>
            )}
        </motion.div>
    )
}