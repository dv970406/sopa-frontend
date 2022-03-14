/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.14
 */

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from '@apollo/client/utilities';

const authLink = setContext((_, { headers }) => {
    // GraphQL 요청을 보낼 때 마다 쿠키에 저장한 토큰을 context header에 같이 싣어보낸다.
    const token = typeof window !== "undefined" ? document.cookie.split("TOKEN=")[1] : null;
    return {
        headers: {
            ...headers,
            // token이 있을 때만 부여해야 SSR로 query처리할 때 context header쪽에서 버그 안남
            ...(token && { token })
        }
    };
});

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_APOLLO_GRAPHQL_URI,
});

export const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    seePosts: offsetLimitPagination(),
                    seeMyComments: offsetLimitPagination(),
                    seeMyLikes: offsetLimitPagination(),
                    seeMyPosts: offsetLimitPagination(),
                }
            },
            Post: {
                fields: {
                    comments: offsetLimitPagination(),
                }
            }
        }
    })
});


