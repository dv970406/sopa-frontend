/**
 * 생성일: 2022.02.16
 * 수정일: 2022.02.24
 */

import { IFetchedSkillsInfo } from './types/interfaces';


export const makeSocialLoginReqUrl = (socialSite: string): string => {
    let baseUrl = null;
    let config = {};

    switch (socialSite) {
        case "naver":
            baseUrl = "https://nid.naver.com/oauth2.0/authorize"
            config = {
                response_type: "code",
                client_id: process.env.NEXT_PUBLIC_SOCIAL_NAVER_KEY,
                redirect_uri: process.env.NEXT_PUBLIC_SOCIAL_NAVER_CODE_REDIRECT,
                state: process.env.NEXT_PUBLIC_SOCIAL_NAVER_STATE
            }
            break;
        case "kakao":
            baseUrl = "https://kauth.kakao.com/oauth/authorize"
            config = {
                client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
                redirect_uri: process.env.NEXT_PUBLIC_SOCIAL_KAKAO_CODE_REDIRECT,
                response_type: "code",
                state: process.env.NEXT_PUBLIC_SOCIAL_KAKAO_STATE
            }
            break;

        case "github":
            baseUrl = `https://github.com/login/oauth/authorize`
            config = {
                client_id: process.env.NEXT_PUBLIC_SOCIAL_GITHUB_KEY,
                redirect_uri: process.env.NEXT_PUBLIC_SOCIAL_GITHUB_CODE_REDIRECT,
                state: process.env.NEXT_PUBLIC_SOCIAL_GITHUB_STATE,
                scope: "read:user user:email"
            }
            break;
    };
    const params = new URLSearchParams(config).toString();
    const reqUrl = `${baseUrl}?${params}`;

    return reqUrl
}

export const makeSkillImages = (
    frontends: IFetchedSkillsInfo[],
    backends: IFetchedSkillsInfo[],
    apps: IFetchedSkillsInfo[]
) => {
    const combineSkills = frontends?.concat(backends)?.concat(apps) || [];

    const skillsInfo = combineSkills?.map(item => {
        switch (item.__typename) {
            case "Frontend":
                return {
                    name: item.skill,
                    imgSrc: `/frontend/${item.skill}.png`
                }
            case "Backend":
                return {
                    name: item.skill,
                    imgSrc: `/backend/${item.skill}.png`
                }
            default:
                return {
                    name: item.skill,
                    imgSrc: `/app/${item.skill}.png`
                }
        }
    })
    return skillsInfo
}

export const getUploadedDate = (createdAt: number) => {
    const transformDate = new Date(createdAt).toLocaleDateString().replace(/\./g, " -").slice(0, -1)
    const changeDivision = transformDate.split("-");
    const makeDateFormat = changeDivision.map(item => item.trim().padStart(2, "0")).join("-")
    return makeDateFormat
}