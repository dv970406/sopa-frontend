/**
 * 생성일: 2022.02.17
 * 수정일: 2022.03.01
 */

import MainLayout from '@components/shared/MainLayout';
import EditUser from '@components/user/edit/EditUser';
import useMyInfo from 'hooks/useMyInfo';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import { useRecoilValue } from "recoil";
import { tokenState } from "@utils/atoms";
import dynamic from 'next/dynamic';

export default function UserEditPage() {
    const { seeMyInfo } = useMyInfo();
    const token = useRecoilValue(tokenState);
    const router = useRouter();
    const NoSsrEditUser = dynamic(
        () => import('@components/user/edit/EditUser'),
        { ssr: false }
    );

    // NoSsr로 화면이 미리 보여지는 것을 막고 useLayoutEffect로 앱 페인트 전에 함수를 실행시킨다고 해서 딱히 유용할지는 모르겠다.
    useLayoutEffect(() => {
        if (!token) router.back();
    }, [])
    return (
        <MainLayout title={`${seeMyInfo?.name} 수정`}>
            <div
                className={`
                    md:px-28 lg:px-52 xl:px-96 space-y-8    
                `}
            >
                <NoSsrEditUser />
            </div>
        </MainLayout>
    )
}