/**
 * 생성일: 2022.02.11
 * 수정일: ------
 */


interface IDraggableSkill {
    index: number;
    skill: string;
    skillImage: string;
}

export default function DraggableSkill({ index, skill, skillImage }: IDraggableSkill) {
    return (
        <div className={`
            flex flex-wrap m-3
            justify-center items-center
        `}>
            <img
                src={`${skillImage}`}
                className={`
                    w-14 h-14
                `}
            />
        </div>
    )
}