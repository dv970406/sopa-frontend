/**
 * 생성일: 2022.02.11
 * 수정일: 2022.02.24
 */

import { useRecoilValue } from 'recoil';
import { skillsState } from '@utils/atoms';
import SelectedSkillBoard from './SelectedSkillBoard';
import SkillBoard from './SkillBoard';


export default function SkillBoards() {
    const skills = useRecoilValue(skillsState);

    return (
        <>
            <div
                className={`
                    flex flex-col space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0
                    
                `}
            >
                {Object.keys(skills).map((position) => <SkillBoard key={position} skillsOfPosition={skills[position]} />)}
            </div>

            <div
            >
                <SelectedSkillBoard />
            </div>
        </>
    )
}