/**
 * 생성일: 2022.02.18
 * 수정일: 2022.02.19
 */

import { IPostDetail } from '@utils/types/interfaces';
import MetaData from './MetaData';
import OpenChatLink from './OpenChatLink';
import SkillImage from './SkillImage';

interface IPostDetailComponent {
    postTitle: string;
    seePost: IPostDetail
}


export default function SeePost({ postTitle, seePost }: IPostDetailComponent) {

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
            {seePost ? (
                <>
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
                    <div
                        className={`
                            flex 
                            ${seePost?.openChatLink ? "justify-between" : "justify-end"}
                        `}
                    >
                        {seePost?.openChatLink ? <OpenChatLink openChatLink={seePost?.openChatLink} /> : null}
                        <MetaData
                            isSeePost={true}
                            postId={seePost?.id}
                            readCount={seePost?.readCount}
                            commentCount={seePost?.commentCount}
                            likeCount={seePost?.likeCount}
                            isLiked={seePost?.isLiked}
                        />
                    </div>
                </>
            ) : "처리중입니다..."
            }
        </>
    )
}