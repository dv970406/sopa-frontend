/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.17
 */


import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"

export interface IMutationResults {
    [key: string]: {
        ok: boolean;
        error?: string;
    }
}

const authLink = setContext((_, { headers }) => {
    // 아래 코드는 CSR 방식으로 쿠키에서 토큰을 가져오는 방식
    //const token = typeof window !== "undefined" ? document.cookie.split("TOKEN=")[1] : "";
    const token = typeof window !== "undefined" ? localStorage.getItem("TOKEN") : "";
    return {
        headers: {
            ...headers,
            token
        }
    }
});

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
});
const errorInfo = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log("graphQLErrors : ", graphQLErrors)
    } else {
        console.log("networkError : ", networkError)
    }
})

export const client = new ApolloClient({
    link: authLink.concat(errorInfo).concat(httpLink),
    cache: new InMemoryCache(),
})

