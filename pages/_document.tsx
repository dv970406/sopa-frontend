import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html>
                <Head>
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