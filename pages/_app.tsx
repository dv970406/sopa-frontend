import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import { client } from '@utils/apollo';

function MyApp({ Component, pageProps }: AppProps) {
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
          <Component {...pageProps} />
        </div>
      </RecoilRoot>
    </ApolloProvider>
  );
};

export default MyApp;
