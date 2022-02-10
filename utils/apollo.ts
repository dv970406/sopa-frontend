/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.10
 */

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context"

const authLink = setContext((_, { headers }) => {
    // 아래 코드는 CSR 방식으로 로컬 스토리지에서 토큰을 가져오는 방식
    // const token = typeof window !== "undefined" ? localStorage.getItem("TOKEN") : "";
    return {
        headers: {
            ...headers,
            //token
        }
    }
});

const httpLink = createHttpLink({
    uri: "http://localhost:4000",
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

