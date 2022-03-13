/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.13
 */

import MainLayout from '@components/shared/MainLayout';
import { useRecoilValue } from 'recoil';
import { loginModeState } from '@utils/atoms';
import Login from '@components/user/Login';
import LoginOrSignUp from '@components/form/LoginOrSignUp';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const AuthenticationPage: NextPage = () => {
    const loginMode = useRecoilValue(loginModeState);

    // CreateUser는 분기처리되어 첫 로드 시 보이지 않으므로 다이나믹으로 가져와서 최적화한다.
    const CreateUser = dynamic(() => import("@components/user/create/CreateUser"));

    return (
        <MainLayout title="로그인">
            <LoginOrSignUp leftText='로그인' rightText='회원가입' />
            {loginMode ? <Login /> : <CreateUser />}
        </MainLayout>
    );
};

export default AuthenticationPage;
