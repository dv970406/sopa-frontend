/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.09
 */

import { gql, useQuery } from '@apollo/client';
import { useSetRecoilState } from 'recoil';
import { tokenState } from '../utils/atoms';

interface ISeeMyProfile {
    seeMyProfile: {
        id: number;
        name: string;
        email: string;
    }
};
const SEE_MY_PROFILE_QUERY = gql`
    query seeMyProfile{
        seeMyProfile{
            id
            name
            email
        }
    }
`;

export default function useMyInfo() {
    const setTokenState = useSetRecoilState(tokenState);
    const seeMyProfileCompleted = (data: ISeeMyProfile) => {
        if (data?.seeMyProfile === null) {
            setTokenState("");
        };
    };
    const { data } = useQuery(SEE_MY_PROFILE_QUERY, {
        onCompleted: seeMyProfileCompleted
    });
    console.log(data)
    return data
}