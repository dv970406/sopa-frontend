/**
 * 생성일: 2022.02.12
 * 수정일: 2022.03.09
 */

import { gql, useQuery } from '@apollo/client';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { tokenState } from '@utils/atoms';
import { useRouter } from 'next/router';
import { USER_SIMPLE_FRAGMENT } from '@utils/fragments';

export interface ISeeMyInfoQuery {
    seeMyInfo: {
        id: number;
        name: string;
        email: string;
        githubURL?: string;
        socialLogin?: string;
        isMe: boolean;
    }
};

const SEE_MY_INFO_QUERY = gql`
    query seeMyInfo{
        seeMyInfo{
            ...UserSimpleFragment
        }
    }
    ${USER_SIMPLE_FRAGMENT}
`;

export default function useMyInfo() {
    const token = useRecoilValue(tokenState);
    const resetToken = useResetRecoilState(tokenState);
    const router = useRouter();

    const myInfoDataCompleted = (data: ISeeMyInfoQuery) => {
        // 만약 로컬스토리지에 들어있는 토큰을 변조하여 보낸다면 백엔드에서 null을 보낼 것이므로 그 때는 강제 로그아웃시킨다.
        if (data.seeMyInfo === null) {
            resetToken();
            localStorage.removeItem("TOKEN");

            // push로 뒤로가기 히스토리 스택을 쌓을 필요가 없다.
            router.replace("/");
        };
    };

    // 유효한 토큰인지 매 요청마다 확인할 것 이니까 network-only를 사용함
    const { data: myInfoData } = useQuery<ISeeMyInfoQuery>(SEE_MY_INFO_QUERY, {
        skip: !token,
        onCompleted: myInfoDataCompleted,
        fetchPolicy: 'network-only'
    });

    return {
        seeMyInfo: myInfoData?.seeMyInfo
    };
};