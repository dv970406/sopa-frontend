/**
 * 생성일: 2022.02.21
 * 수정일: 2022.02.27
 */

import MetaData from '../MetaData';
import OpenChatLink from '../OpenChatLink';
import SkillImage from '../../skill/SkillImage';
import DisplayComment from '../../comment/read/DisplayComment';
import CreateComment from '../../comment/create/CreateComment';
import MenuBtn from '../MenuBtn';
import { ICommentInfo, IPostDetail } from '@utils/types/interfaces';
import InfiniteScrolling from '@components/shared/InfiniteScrolling';

interface ISeePostDetailComponent {
    pageTitle: string;
    seePost: IPostDetail;
    fetchMore: any;
    comments: ICommentInfo[];
}

export default function SeePostDetail({ pageTitle, seePost, fetchMore, comments }: ISeePostDetailComponent) {

    return (
        <>
            <div
                className={`
                    flex justify-between items-center
                    border-b-2 border-b-fuchsia-400 w-full
                `}
            >
                <h1
                    className={`
                        text-4xl font-bold p-3
                    `}
                >
                    {seePost?.title || pageTitle}
                </h1>
                {seePost?.isMine ? <MenuBtn postId={seePost?.id} /> : null}
            </div>
            {seePost?.id ? (
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
                    <p
                        className='
                            break-words tracking-wider 
                            text-sm lg:text-lg
                        '
                    >
                        {seePost?.description}
                    </p>
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
            ) : "처리중입니다..."}

            <CreateComment postId={seePost?.id} />

            <InfiniteScrolling
                howManyData={seePost.commentCount}
                css='space-y-4'
                fetchMore={fetchMore}
            >
                {comments?.map(comment =>
                    <DisplayComment key={comment.id} {...comment} />
                )}
            </InfiniteScrolling>
        </>
    )
}