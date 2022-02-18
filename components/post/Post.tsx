/**
 * 생성일: 2022.02.17
 * 수정일: 2022.02.18
 */

import { IPostDisplay } from '@utils/types/interfaces';
import { useRouter } from 'next/router';
import MetaData from './MetaData';
import SkillImage from './SkillImage';

export default function Post(
    { id, title, commentCount, isExpired, likeCount, isLiked, readCount, frontends, backends, apps, updatedAt }: IPostDisplay
) {
    const router = useRouter();
    const goToPostDetail = () => router.push({
        pathname: `/post/${id}`,
        query: {
            title,
        }
    }, `/post/${id}`);

    return (
        <div
            onClick={goToPostDetail}
            className={`
                border-2 border-fuchsia-100 rounded-lg p-6
                w-full
                flex flex-col justify-center items-center
                space-y-5 shadow-md
                hover:scale-105 transition-all duration-300 cursor-pointer
                hover:border-fuchsia-300
            `}
        >
            <div
                className={`
                    flex flex-wrap gap-6
                `}
            >
                <SkillImage
                    frontends={frontends}
                    backends={backends}
                    apps={apps}
                />
            </div>
            <p>{title}</p>
            <MetaData
                commentCount={commentCount}
                isLiked={isLiked}
                likeCount={likeCount}
                postId={id}
                readCount={readCount}
            />
        </div>
    )
}
