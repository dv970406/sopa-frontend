import { IPostDetail } from '@utils/types/interfaces';
import MetaData from './MetaData';
import SkillImage from './SkillImage';

interface IPostDetailComponent {
    postTitle: string;
    seePost: IPostDetail
}

export default function PostDetail({ postTitle, seePost }: IPostDetailComponent) {
    return (
        <>
            <h1
                className={`
                    text-4xl font-bold
                    border-b-2 border-b-fuchsia-400 w-full
                    p-3
                `}
            >
                {postTitle || seePost?.title}
            </h1>
            <div
                className={`
                        flex justify-center gap-5
                    `}
            >
                <SkillImage
                    frontends={seePost?.frontends}
                    backends={seePost?.backends}
                    apps={seePost?.apps}
                />
            </div>
            <p>{seePost?.description ?? "zz"}</p>
            <MetaData
                postId={seePost?.id}
                readCount={seePost?.readCount}
                commentCount={seePost?.commentCount}
                likeCount={seePost?.likeCount}
                isLiked={seePost?.isLiked}
            />
        </>
    )
}