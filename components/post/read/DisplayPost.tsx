/**
 * 생성일: 2022.02.17
 * 수정일: 2022.03.16
 */

import type { IPostSemiDetailInfo } from '@utils/types/interfaces';
import MetaData from '../MetaData';
import SkillImage from '../../skill/SkillImage';
import { getCreatedDate } from '@utils/utilFunctions';

// index 페이지나 profile페이지에서 게시글의 대략적인 정보를 알려 줄 DisplayPost Component
export default function DisplayPost(
    { id, title, commentCount, isExpired, likeCount, isLiked, readCount, frontends, backends, apps, createdAt }: IPostSemiDetailInfo
) {
    return (
        <div
            className="flex flex-col items-center justify-between w-full h-full p-6 space-y-8 transition-all duration-300 border-2 rounded-lg shadow-xl cursor-pointer border-fuchsia-100 hover:border-sopa-pure hover:ring-2 ring-sopa-default ring-offset-2 dark:bg-dark-default hover:scale-105"
        >
            <div
                className="flex flex-wrap justify-center gap-6"
            >
                <SkillImage
                    displayMode
                    frontends={frontends}
                    backends={backends}
                    apps={apps}
                />
            </div>
            <h1
                className="text-base font-bold line-clamp-2"
            >
                {title}
            </h1>
            <div
                className="flex items-center justify-between w-full place-self-end"
            >
                <MetaData
                    commentCount={commentCount}
                    isLiked={isLiked}
                    likeCount={likeCount}
                    postId={id}
                    readCount={readCount}
                />
                <p
                    className="text-sm font-semibold place-self-end"
                >
                    {getCreatedDate(+createdAt)}
                </p>
            </div>
        </div>
    );
};
