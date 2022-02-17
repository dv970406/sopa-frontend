/**
 * 생성일: 2022.02.12
 * 수정일: 2022.02.17
 */

import { gql, useQuery } from '@apollo/client'
import { useRecoilState } from 'recoil';
import { tokenState } from '@utils/atoms';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface IMyInfo {
    seeMyProfile: {
        id: number;
        socialLogin?: string;
        name: string;
        email: string;
    }
};
const SEE_MY_PROFILE_QUERY = gql`
    query seeMyProfile{
        seeMyProfile{
            id
            socialLogin
            name
            email
        }
    }
`;

export default function useMyInfo() {
    const [token, setToken] = useRecoilState(tokenState);
    const router = useRouter();

    const myInfoDataCompleted = (data: IMyInfo) => {
        // 만약 쿠키에 들어있는 토큰을 변조하여 보낸다면 백엔드에서 null을 보낼 것이므로 그 때는 강제 로그아웃시킨다.
        if (data.seeMyProfile === null) {
            //document.cookie = `TOKEN=; expires=${new Date().toUTCString()};`;
            localStorage.removeItem("TOKEN");
            setToken("");
            router.push("/");
        }
    }

    const { data: myInfoData } = useQuery(SEE_MY_PROFILE_QUERY, {
        skip: !token,
        onCompleted: myInfoDataCompleted
    })

    return {
        seeMyProfile: myInfoData?.seeMyProfile
    }
}