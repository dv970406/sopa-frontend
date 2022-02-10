/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.10
 */

import MainLayout from '../components/shared/MainLayout';
import SelectOne from '../components/form/SelectOne';
import { useRecoilValue } from 'recoil';
import { loginModeState } from '../utils/atoms';
import SignUp from '../components/auth/SignUp';
import Login from '../components/auth/Login';

export default function Authentication() {
    const loginMode = useRecoilValue(loginModeState);

    return (
        <MainLayout title="로그인">
            <SelectOne leftText='로그인' rightText='회원가입' />
            {loginMode ? <Login /> : <SignUp />}
        </MainLayout>
    )
}