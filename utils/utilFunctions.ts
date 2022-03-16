/**
 * 생성일: 2022.02.16
 * 수정일: 2022.03.16
 */

import type { IFetchedSkillsInfo, ISkillImage } from './types/interfaces';

interface IMakeSocialLoginReqUrl {
    socialSite: string;
    reprompt?: boolean;
}
// 소셜로그인 요청 URL을 만들어주는 함수
export const makeSocialLoginReqUrl = ({ socialSite, reprompt }: IMakeSocialLoginReqUrl): string => {
    let baseUrl = null;
    let config = {};

    switch (socialSite) {
        case "naver":
            baseUrl = "https://nid.naver.com/oauth2.0/authorize";
            config = {
                response_type: "code",
                client_id: process.env.NEXT_PUBLIC_SOCIAL_NAVER_KEY,
                redirect_uri: process.env.NEXT_PUBLIC_SOCIAL_NAVER_CODE_REDIRECT,
                state: process.env.NEXT_PUBLIC_SOCIAL_NAVER_STATE,
                auth_type: reprompt ? "reprompt" : undefined
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
};

type MakeSkillImages = (frontends: IFetchedSkillsInfo[], backends: IFetchedSkillsInfo[], apps: IFetchedSkillsInfo[]) => ISkillImage[];
// 스킬 정보를 받아 포지션과 스킬 이름을 파악하여 해당 img의 경로와 이어주는 함수
export const makeSkillImages: MakeSkillImages = (frontends, backends, apps) => {
    const combineSkills = frontends?.concat(backends)?.concat(apps) || [];
    const skillsInfo = combineSkills?.map((skill: IFetchedSkillsInfo): ISkillImage => {
        switch (skill.__typename) {
            case "Frontend":
                return {
                    name: skill.name,
                    skillImageSrc: `/frontend/${skill.name}.png`
                };
            case "Backend":
                return {
                    name: skill.name,
                    skillImageSrc: `/backend/${skill.name}.png`
                };
            default:
                return {
                    name: skill.name,
                    skillImageSrc: `/app/${skill.name}.png`
                };
        };
    })
    return skillsInfo;
};

// 게시물, 댓글의 업로드 시간을 밀리초로 받아 YYYY년 M월 D일 HH:MM 으로 변환해주는 함수
export const getCreatedDate = (createdAt: number): string => {
    // Korean Style Date
    const date = new Date(createdAt);
    const getYear = date.getFullYear();
    const getMonth = date.getMonth() + 1;
    const getDay = date.getDate();
    const getHour = String(date.getHours()).padStart(2, "0");
    const getMinute = String(date.getMinutes()).padStart(2, "0");
    const makeDateFormat = `${getYear}년 ${getMonth}월 ${getDay}일 ${getHour}:${getMinute}`;
    return makeDateFormat;
};