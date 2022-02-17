/**
 * 생성일: 2022.02.17
 * 수정일: ------
 */

import { IPost } from '@utils/types/interfaces';

export default function Post(
    { id, title, description, commentCount, isExpired, likeCount, readCount, frontends, backends, apps, createdAt }: IPost
) {
    const combineSkills = [...frontends, ...backends, ...apps];

    const returnImgSrc = combineSkills?.map(item => {
        switch (item.__typename) {
            case "Frontend":
                return `/frontend/${item.skill}.png`
            case "Backend":
                return `/backend/${item.skill}.png`
            default:
                return `/app/${item.skill}.png`
        }
    })
    return (
        <div
            className={`
                border-2 border-fuchsia-300 rounded-lg p-6
                w-full
                flex flex-col justify-center items-center
                space-y-5
            `}
        >
            <div
                className={`
                    flex flex-wrap gap-6
                `}
            >
                {returnImgSrc?.map((imgSrc: string, index) =>
                    <img
                        key={index}
                        src={imgSrc}
                        className={`
                            w-12 h-12
                        `}
                    />
                )}
            </div>
            <p>{title}</p>
            <div
                className={`
                    flex justify-between
                    w-full

                `}
            >
                <div
                    className={`
                        flex
                        items-center
                        space-x-2
                    `}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span>{readCount}</span>

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    <span>{commentCount}</span>

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{likeCount}</span>
                </div>
                <div>
                    <p>{new Date(+createdAt).toLocaleString().slice(0, -3)}</p>
                </div>
            </div>
        </div>
    )
}
