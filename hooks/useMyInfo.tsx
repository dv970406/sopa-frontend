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

function useMyInfo() {
    const setToken = useSetRecoilState(tokenState);

    const myInfoCompleted = (data: ISeeMyProfile) => {
        if (data.seeMyProfile === null) {
            setToken(null);
            localStorage.removeItem("TOKEN");
        };
    };

    const { data: myInfoData } = useQuery(SEE_MY_PROFILE_QUERY, {
        onCompleted: myInfoCompleted
    });

    return myInfoData;
}

export default useMyInfo