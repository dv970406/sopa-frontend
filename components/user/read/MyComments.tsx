/**
 * 생성일: 2022.02.25
 * 수정일: 2022.02.26
 */

import DisplayComment from '@components/comment/read/DisplayComment';
import InfiniteScrolling from '@components/shared/InfiniteScrolling';
import { commentsState } from '@utils/atoms';
import { ICommentInfo } from '@utils/types/interfaces';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

interface IMyCommentsComponent {
    fetchMore: any;
}

export default function MyComments({ fetchMore }: IMyCommentsComponent) {
    const router = useRouter();
    const comments = useRecoilValue(commentsState);

    return (
        <div
            className="md:px-12 lg:px-24 xl:px-48"
        >
            <InfiniteScrolling
                css="flex flex-col space-y-5"
                fetchMore={fetchMore}
            >
                {comments?.map((comment: ICommentInfo) =>
                    <div
                        key={comment.id}
                        className="
                        flex space-x-4
                    "
                    >
                        <DisplayComment {...comment} />
                        <button
                            onClick={() => router.push(`/post/${comment?.postId}`)}
                            className={`
                                    flex justify-center items-center bg-fuchsia-300 hover:bg-fuchsia-400 transition text-white font-bold rounded-lg p-2
                                `}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                )}
            </InfiniteScrolling>
        </div>
    )
}