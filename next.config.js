/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  /* async rewrites() {
    // 소셜로그인 이렇게 처리하려니 해당 소셜사이트가 CSS랑 자바스크립트 로드를 못하더라
    return [
      {
        source: "/api/sociallogin/naver",
        destination: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.SOCIAL_NAVER_KEY}&redirect_uri=${process.env.SOCIAL_NAVER_CODE_REDIRECT}&state=${process.env.SOCIAL_NAVER_STATE}`
      },
      {
        source: "/api/sociallogin/github",
        destination: `https://github.com/login/oauth/authorize?client_id=${process.env.SOCIAL_GITHUB_KEY}&redirect_uri=${process.env.SOCIAL_GITHUB_CODE_REDIRECT}&state=${process.env.SOCIAL_GITHUB_STATE}`
      },
      {
        source: "/api/sociallogin/kakao",
        destination: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.SOCIAL_KAKAO_CODE_REDIRECT}&response_type=code&state=${process.env.SOCIAL_KAKAO_STATE}`
      }
    ]
  } */
}

module.exports = nextConfig
