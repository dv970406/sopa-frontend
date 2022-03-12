/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.09
 */

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from '@apollo/client/utilities';

const authLink = setContext((_, { headers }) => {
    // GraphQL 요청을 보낼 때 마다 클라이언트 측(로컬 스토리지)에 저장한 토큰을 context header에 같이 싣어보낸다.
    const token = typeof window !== "undefined" ? localStorage.getItem("TOKEN") : "";
    return {
        headers: {
            ...headers,
            token
        }
    };
});

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_APOLLO_GRAPHQL_URI,
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    ssrMode: typeof window === "undefined",
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


