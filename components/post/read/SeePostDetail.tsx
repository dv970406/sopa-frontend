/**
 * 생성일: 2022.02.21
 * 수정일: 2022.03.10
 */

import MetaData from '../MetaData';
import OpenChatLink from '../OpenChatLink';
import SkillImage from '../../skill/SkillImage';
import DisplayComment from '../../comment/read/DisplayComment';
import CreateComment from '../../comment/create/CreateComment';
import MenuBtn from '../MenuBtn';
import type { ICommentInfo, IPostDetail } from '@utils/types/interfaces';
import InfiniteScrolling from '@components/shared/InfiniteScrolling';
import { useRecoilValue } from "recoil";
import { tokenState } from "@utils/atoms";
import Loading from '@components/shared/Loading';
import { ApolloQueryResult } from '@apollo/client';
import AuthorGithubLink from '../AuthorGithubLink';

interface ISeePostDetailComponent {
    pageTitle: string;
    seePost: IPostDetail;
    fetchMore: () => Promise<ApolloQueryResult<unknown>>;
    comments: ICommentInfo[];
};

export default function SeePostDetail({ pageTitle, seePost, fetchMore, comments }: ISeePostDetailComponent) {
    // 토큰이 있다면 로그인 상태이고 없다면 비로그인 상태이므로 이를 분기처리하여 CreateComment를 제공할 것인지 결정한다.
    const token = useRecoilValue(tokenState);
    return (
        <>
            <div
                className="
                    flex justify-between items-center
                    w-full p-3
                    border-b-2 border-b-sopa-default                 
                "
            >
                <h1
                    className="
                        text-4xl font-bold
                    "
                >
                    {seePost?.title || pageTitle}
                </h1>
                {seePost?.isMine ? (
                    <MenuBtn postId={seePost?.id} />
                ) : (
                    <AuthorGithubLink
                        user={seePost?.user}
                    />
                )}
            </div>
            {seePost?.id ? (
                <div
                    className="
                        w-full py-3
                        border-b-2 border-b-sopa-default
                    "
                >
                    <div
                        className="
                            flex flex-wrap justify-center gap-5
                        "
                    >
                        <SkillImage
                            frontends={seePost?.frontends}
                            backends={seePost?.backends}
                            apps={seePost?.apps}
                        />
                    </div>
                    <p
                        className="
                            py-7
                            break-words whitespace-pre-wrap
                            text-md lg:text-lg 
                        "
                    >
                        {seePost?.description}
                    </p>
                    <div
                        className={`
                            flex ${seePost?.openChatLink ? "justify-between" : "justify-end"}
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
                </div>
            ) : <Loading />}

            {token ? <CreateComment postId={seePost?.id} /> : null}

            <InfiniteScrolling
                howManyData={seePost?.commentCount}
                css='space-y-4'
                fetchMore={fetchMore}
            >
                {comments?.map((comment: ICommentInfo) =>
                    <DisplayComment key={comment.id} {...comment} />
                )}
            </InfiniteScrolling>
        </>
    );
};