/**
 * 생성일: 2022.02.17
 * 수정일: 2022.02.20
 */

import { IPostDisplay } from '@utils/types/interfaces';
import MetaData from './MetaData';
import SkillImage from './SkillImage';

export default function DisplayPost(
    { id, title, commentCount, isExpired, likeCount, isLiked, readCount, frontends, backends, apps, updatedAt }: IPostDisplay
) {
    return (
        <div
            className={`
                border-2 border-fuchsia-100 rounded-lg p-6
                w-full
                flex flex-col justify-center items-center
                space-y-5 shadow-md
                hover:scale-105 transition-all duration-300 cursor-pointer
                hover:border-fuchsia-300 hover:ring-2 ring-fuchsia-400 ring-offset-2
            `}
        >
            <div
                className={`
                    flex flex-wrap gap-6
                    justify-center
                `}
            >
                <SkillImage
                    frontends={frontends}
                    backends={backends}
                    apps={apps}
                />
            </div>
            <p>{title}</p>
            <div
                className={`
                    flex justify-between w-full
                    items-center
                `}
            >
                <MetaData
                    commentCount={commentCount}
                    isLiked={isLiked}
                    likeCount={likeCount}
                    postId={id}
                    readCount={readCount}
                />
                <p
                    className={`
                        text-sm
                        place-self-end
                    `}
                >
                    {new Date(+updatedAt).toLocaleString().slice(0, -3)}
                </p>
            </div>
        </div>
    )
}
