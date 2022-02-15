/**
 * 생성일: 2022.02.11
 * 수정일: 2022.02.15
 */

import { gql } from '@apollo/client';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { client } from '@utils/apollo';
import { ISkill, postsState, selectedSkillsState, skillsState } from '@utils/atoms';

const SEE_POSTS_QUERY = gql`
    query seePosts($skills:String){
        seePosts(skills:$skills){
            id
            title
        }
    }
`

export default function SelectedSkillBoard() {
    const [selectedSkills, setSelectedSkills] = useRecoilState(selectedSkillsState);
    const setSkills = useSetRecoilState(skillsState);
    const setPosts = useSetRecoilState(postsState)

    const onClick = (selectedSkill: ISkill, index: number): void => {
        // SelectedSkillBoard에서 선택하면 selectedSkillsState에서 값을 삭제함
        setSelectedSkills(prev => {
            const copiedPrev = [...prev];
            copiedPrev.splice(index, 1);

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

    const getPosts = async () => {
        const clearedSelectedSkills = selectedSkills.map(skill => {
            const { isSelected, skillImage, ...skillWithPosition } = skill
            return skillWithPosition
        })
        const { data } = await client.query({
            query: SEE_POSTS_QUERY,
            ...(clearedSelectedSkills.length > 0 && {
                variables: {
                    skills: JSON.stringify(clearedSelectedSkills)
                }
            })
        })
        setPosts(data.seePosts)
    }
    useEffect(() => {
        getPosts()
    }, [selectedSkills])

    return (
        <motion.div
            className={`
                ${selectedSkills.length > 0 ? "" : "opacity-0"} transition-opacity
                w-full
                flex flex-wrap mt-10 justify-center
                rounded-lg shadow-xl border-2 border-fuchsia-400 bg-fuchsia-300
                h-1/6
                px-6 py-4
            `}

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
                        src={selectedSkill.skillImage}
                        className={`
                        w-14 h-14
                        
                    `}
                    />
                </motion.div>
            )}
        </motion.div>
    )
}