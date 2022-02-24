/**
 * 생성일: 2022.02.18
 * 수정일: 2022.02.24
 */

import { IFetchedSkillsInfo } from '@utils/types/interfaces';
import { makeSkillImages } from '@utils/utilFunctions';

interface ISkillImage {
    [key: string]: IFetchedSkillsInfo[]
}
interface IMakeSkillImages {
    name: string;
    imgSrc: string;
}

export default function SkillImage({ frontends, backends, apps }: ISkillImage) {
    const skillsInfo = makeSkillImages(frontends, backends, apps)

    return (
        <>
            {skillsInfo?.map((skill: IMakeSkillImages, index: number) =>
                <div
                    key={index}
                    className={`
                        flex flex-col items-center text-xs
                    `}
                >
                    <img
                        src={skill.imgSrc}
                        className={`
                        w-12 h-12
                    `}
                    />
                    <p>{skill.name}</p>
                </div>
            )}
        </>
    )
}