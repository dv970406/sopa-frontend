/**
 * 생성일: 2022.02.08
 * 수정일: ------
 */

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: `http://localhost:4000`,
    cache: new InMemoryCache()
})