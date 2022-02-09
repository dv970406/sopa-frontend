/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.09
 */

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context"

const authLink = setContext((_, { headers }) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("TOKEN") : "";
    return {
        headers: {
            ...headers,
            token
        }
    }
});

const httpLink = createHttpLink({
    uri: "http://localhost:4000",
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: true
})

