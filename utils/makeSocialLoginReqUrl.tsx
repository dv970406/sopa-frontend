/**
 * 생성일: 2022.02.16
 * 수정일: 2022.02.17
 */


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