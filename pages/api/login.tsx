/**
 * 생성일: 2022.02.09
 * 수정일: 2022.02.14
 */

import { gql } from '@apollo/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@utils/apollo';

const LOGIN_MUTATION = gql`
    mutation login($email:String!,$password:String!){
        login(email:$email,password:$password){
            ok
            token
            error
        }
    }
`;

// 굳이 API Route를 사용하지 않고 그냥 프론트 측에서 바로 apollo/client로 GraphQL 요청을 보내도 되긴 함
// 현 프로젝트는 Apollo 서버를 따로 두고 있지만 만약 서버가 없는 상태에서도 Next는 API Route를 서버처럼 사용하여 prisma로 DB와 상호작용하면 된다.
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = JSON.parse(req.body)

    const { data: { login } } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
            email,
            password
        }
    })

    // 만약 POST로 들어오는 요청이 아니라면 잘못된 요청이라고 응답.
    if (req.method !== "POST") {
        return res.status(405).end();
    }
    req.headers['set-cookie'] = login.token

    return res.status(200).json({ login });
}
