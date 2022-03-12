import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <link rel="canonical" href="https://sopa.life" />
                    <meta name="robots" content="index,follow" />
                    <meta name="description" content="프로젝트 스터디 팀원 매칭 사이트 소파입니다!" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="프로젝트 스터디 팀원 매칭 사이트 소파" />
                    <meta property="og:description" content="프로젝트 스터디 팀원 매칭 사이트 소파입니다!" />
                    <meta property="og:image" content="/sopa.png" />
                    <meta property="og:url" content="https://sopa.life" />

                    <meta name="naver-site-verification" content="0e64f40739e6498e5b76b9b1ef44e2aa487f6a55" />
                    <meta name="google-site-verification" content="srp9jK3TFsDUgBynirvmzHcnvmiYV2xmv8u28ALEr9E" />
                    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument