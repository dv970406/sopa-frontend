/**
 * 생성일: 2022.02.18
 * 수정일: 2022.03.05
 */

import type { IPostSemiDetailInfo } from '@utils/types/interfaces';
import { useRouter } from 'next/router';
import React from 'react';
import SkillImage from '../../skill/SkillImage';

interface ISeeSemiDetailComponent {
    semiDetail: IPostSemiDetailInfo
};

export default function SeeSemiDetail({ semiDetail }: ISeeSemiDetailComponent) {
    const router = useRouter();

    // 부모 컴포넌트(seePosts)로부터의 이벤트 캡쳐링을 막아 SemiDetail이 꺼지지 않게 한다.
    const preventEventBubbling = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    // SeePostDetail로 보낼 때 title을 url query에 같이 싣어서 보내는데 as로 마스킹하여 보이지는 않게 한다.
    const goToPostDetail = () => router.push({
        pathname: `/post/${semiDetail.id}`,
        query: {
            title: semiDetail.title,
        }
    }, `/post/${semiDetail.id}`);

    return (
        <div
            onClick={preventEventBubbling}
            className="relative min-h-full p-4 space-y-2 bg-white rounded-3xl dark:bg-dark-default"
        >
            <div
                className="flex items-center justify-between px-2 pb-3 space-x-6 border-b-2 border-b-sopa-default"
            >
                <h1
                    className="text-xl font-bold cursor-pointer"
                    onClick={() => goToPostDetail()}
                >
                    {semiDetail.title}
                </h1>
                <svg
                    onClick={() => goToPostDetail()}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className="w-8 h-8 transition-colors cursor-pointer text-sopa-pure hover:text-sopa-accent"
                >
                    <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd" />
                </svg>
            </div>
            <p
                className="h-40 py-2 overflow-y-scroll break-words whitespace-pre-wrap "
            >
                {semiDetail.description}
            </p>
            <div
                className="flex items-center justify-between w-full "
            >
                <div
                    className="flex flex-wrap gap-2 space-x-2 "
                >
                    <SkillImage
                        frontends={semiDetail.frontends}
                        backends={semiDetail.backends}
                        apps={semiDetail.apps}
                    />
                </div>
                <p
                    className="text-lg font-bold "
                >
                    {semiDetail.user.name}
                </p>
            </div>
        </div>
    )
}
