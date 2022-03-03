/**
 * 생성일: 2022.02.16
 * 수정일: 2022.03.02
 */

import type { IFetchedSkillsInfo } from './types/interfaces';

export const makeSocialLoginReqUrl = (socialSite: string): string => {
    let baseUrl = null;
    let config = {};

    switch (socialSite) {
        case "naver":
            baseUrl = "https://nid.naver.com/oauth2.0/authorize";
            config = {
                response_type: "code",
                client_id: process.env.NEXT_PUBLIC_SOCIAL_NAVER_KEY,
                redirect_uri: process.env.NEXT_PUBLIC_SOCIAL_NAVER_CODE_REDIRECT,
                state: process.env.NEXT_PUBLIC_SOCIAL_NAVER_STATE
            };
            break;
        case "kakao":
            baseUrl = "https://kauth.kakao.com/oauth/authorize";
            config = {
                client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
                redirect_uri: process.env.NEXT_PUBLIC_SOCIAL_KAKAO_CODE_REDIRECT,
                response_type: "code",
                state: process.env.NEXT_PUBLIC_SOCIAL_KAKAO_STATE
            };
            break;

        case "github":
            baseUrl = `https://github.com/login/oauth/authorize`;
            config = {
                client_id: process.env.NEXT_PUBLIC_SOCIAL_GITHUB_KEY,
                redirect_uri: process.env.NEXT_PUBLIC_SOCIAL_GITHUB_CODE_REDIRECT,
                state: process.env.NEXT_PUBLIC_SOCIAL_GITHUB_STATE,
                scope: "read:user user:email"
            };
            break;
    };
    const params = new URLSearchParams(config).toString();
    const reqUrl = `${baseUrl}?${params}`;

    return reqUrl;
}

export const makeSkillImages = (
    frontends: IFetchedSkillsInfo[],
    backends: IFetchedSkillsInfo[],
    apps: IFetchedSkillsInfo[]
) => {
    const combineSkills = frontends?.concat(backends)?.concat(apps) || [];
    const skillsInfo = combineSkills?.map(skill => {
        switch (skill.__typename) {
            case "Frontend":
                return {
                    name: skill.name,
                    imgSrc: `/frontend/${skill.name}.png`
                };
            case "Backend":
                return {
                    name: skill.name,
                    imgSrc: `/backend/${skill.name}.png`
                };
            default:
                return {
                    name: skill.name,
                    imgSrc: `/app/${skill.name}.png`
                };
        };
    })
    return skillsInfo;
};

export const getUploadedDate = (createdAt: number) => {
    // "-" Style Date
    /* const transformDate = new Date(createdAt).toLocaleDateString().replace(/\./g, " -").slice(0, -1)
    const changeDivision = transformDate.split("-");
    const makeDateFormat = changeDivision.map(item => item.trim().padStart(2, "0")).join("-") */

    // Korean Style Date
    const date = new Date(createdAt);
    const getYear = date.getFullYear();
    const getMonth = date.getMonth() + 1;
    const getDay = date.getDate();
    const makeDateFormat = `${getYear}년 ${getMonth}월 ${getDay}일`;
    return makeDateFormat;
};