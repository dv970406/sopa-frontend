/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.01
 */

import MainLayout from '@components/shared/MainLayout';
import { useRecoilValue } from 'recoil';
import { loginModeState, tokenState } from '@utils/atoms';
import Login from '@components/user/Login';
import LoginOrSignUp from '@components/form/LoginOrSignUp';
import CreateUser from '@components/user/create/CreateUser';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';

export default function AuthenticationPage() {
    const loginMode = useRecoilValue(loginModeState);
    const token = useRecoilValue(tokenState);
    const router = useRouter();

    // NoSsr로 화면이 미리 보여지는 것을 막고 useLayoutEffect로 앱 페인트 전에 함수를 실행시킨다고 해서 딱히 유용할지는 모르겠다.
    useLayoutEffect(() => {
        if (token) router.back();
    }, []);
    return (
        <MainLayout title="로그인">
            <LoginOrSignUp leftText='로그인' rightText='회원가입' />
            {loginMode ? <Login /> : <CreateUser />}
        </MainLayout>
    )
}
