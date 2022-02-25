/**
 * 생성일: 2022.02.18
 * 수정일: 2022.02.25
 */

import { IPostDisplay } from '@utils/types/interfaces';
import { useRouter } from 'next/router';
import React from 'react';
import SkillImage from '../../skill/SkillImage';

interface ISeeSemiDetail {
    semiDetail: IPostDisplay
}

export default function SeeSemiDetail({ semiDetail }: ISeeSemiDetail) {
    const router = useRouter();

    const preventCloseSemiDetail = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    }

    const goToPostDetail = () => router.push({
        pathname: `/post/${semiDetail.id}`,
        query: {
            title: semiDetail.title,
        }
    }, `/post/${semiDetail.id}`);

    return (
        <div
            onClick={preventCloseSemiDetail}
            className={`
                relative 
                bg-white min-h-full rounded-3xl p-4 space-y-2
            `}
        >
            <div
                className={`
                    flex justify-between items-center space-x-6
                    border-b-2 border-b-fuchsia-400 pb-3 px-2
                `}
            >
                <h1
                    className={`
                        text-xl font-bold cursor-pointer
                    `}
                    onClick={() => goToPostDetail()}
                >
                    {semiDetail.title}
                </h1>
                <svg
                    onClick={() => goToPostDetail()}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className={`
                        w-16 h-16 sm:w-8 sm:h-8 cursor-pointer text-fuchsia-300 transition-colors
                        hover:text-fuchsia-500
                    `}
                >
                    <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd" />
                </svg>
            </div>
            <p
                className={`
                    py-2 break-words
                `}
            >
                {semiDetail.description}
            </p>
            <div
                className={`
                    flex positio justify-between items-center
                    w-full
                `}
            >
                <div
                    className={`
                        space-x-2
                        flex flex-wrap
                        gap-2
                    `}
                >
                    <SkillImage
                        frontends={semiDetail.frontends}
                        backends={semiDetail.backends}
                        apps={semiDetail.apps}
                    />
                </div>
                <p
                    className={`
                        text-lg font-semibold
                    `}
                >
                    {semiDetail.user.name}
                </p>
            </div>
        </div>
    )
}
