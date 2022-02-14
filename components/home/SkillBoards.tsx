/**
 * 생성일: 2022.02.11
 * 수정일: 2022.02.14
 */

import { useRecoilValue } from 'recoil';
import { skillsState } from '../../utils/atoms';
import SelectedSkillBoard from './SelectedSkillBoard';
import SkillBoard from './SkillBoard';


export default function SkillBoards() {
    const skills = useRecoilValue(skillsState);

    return (
        <>
            <div
                className={`
                    space-y-4
                `}
            >
                {Object.keys(skills).map((position) => <SkillBoard key={position} skillOfPosition={skills[position]} />)}
            </div>

            <div
            >
                <SelectedSkillBoard />
            </div>
        </>
    )
}