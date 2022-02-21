/**
 * 생성일: 2022.02.17
 * 수정일: ------
 */

import MainLayout from '@components/shared/MainLayout'
import EditUser from '@components/user/EditUser'
import useMyInfo from 'hooks/useMyInfo';

export default function UserEditPage() {
    const { seeMyProfile } = useMyInfo();

    return (
        <MainLayout title={`${seeMyProfile?.name} 수정`}>
            <div>
                <EditUser />
            </div>
        </MainLayout>
    )
}