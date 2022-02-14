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

// 굳이 API Route를 사용하지 않고 그냥 apollo/client을 사용해도 되긴 하다.
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
