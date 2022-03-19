import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import { client } from '@utils/apollo';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {

  // SSR로 처리한 데이터를 cache에 동기화시켜서 CSR 처리하는 데이터와 동일시 되게 한다.
  // 이 처리 안해주면 SSR로 처리한 데이터를 CSR에서 인식을 못하더라
  if (pageProps.initialCache) {
    client.cache.restore(pageProps.initialCache);
  };

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <div
          className="
            box-border
            dark:bg-dark-ultra dark:text-dark-text-color
            min-h-screen min-w-full
          "
        >
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          </Head>
          <Component {...pageProps} />
        </div>
      </RecoilRoot>
    </ApolloProvider>
  );
};

export default MyApp;
