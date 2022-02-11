/**
 * 생성일: 2022.02.11
 * 수정일: ------
 */

import { useRecoilValue } from 'recoil';
import { selectedSkillsState, skillsState } from '../../utils/atoms';
import SelectedSkillBoard from './SelectedSkillBoard';
import SkillBoard from './SkillBoard';


export default function SkillBoards() {
    const skills = useRecoilValue(skillsState);
    const selectedSkills = useRecoilValue(selectedSkillsState);

    return (
        <>
            <div
                className={`
                    space-y-4
                `}
            >
                {Object.keys(skills).map((position, index) => <SkillBoard key={index} skillOfPosition={skills[position]} />)}
            </div>

            <div
            >
                <SelectedSkillBoard selectedSkills={selectedSkills} />
            </div>
        </>
    )
}