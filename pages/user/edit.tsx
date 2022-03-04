/**
 * 생성일: 2022.02.17
 * 수정일: 2022.03.01
 */

import MainLayout from '@components/shared/MainLayout';
import EditUser from '@components/user/edit/EditUser';
import useMyInfo from 'hooks/useMyInfo';
import dynamic from 'next/dynamic';

export default function UserEditPage() {
    const { seeMyInfo } = useMyInfo();
    const NoSsrEditUser = dynamic(
        () => import('@components/user/edit/EditUser'),
        { ssr: false }
    );

    return (
        <MainLayout title={`${seeMyInfo?.name} 수정`}>
            <div
                className="md:px-28 lg:px-52 xl:px-96 space-y-8"
            >
                <NoSsrEditUser />
            </div>
        </MainLayout>
    )
}