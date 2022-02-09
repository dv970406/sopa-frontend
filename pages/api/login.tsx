/**
 * 생성일: 2022.02.09
 * 수정일: ------
 */

import { gql } from '@apollo/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/apollo';

const LOGIN_MUTATION = gql`
    mutation login($email:String!,$password:String!){
        login(email:$email,password:$password){
            ok
            token
            error
        }
    }
`;
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = JSON.parse(req.body)

    const { data: { login } } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
            email,
            password
        },
    })

    return res.status(200).json({ login });
}