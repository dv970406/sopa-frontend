/**
 * 생성일: 2022.02.17
 * 수정일: 2022.03.05
 */

import MainLayout from '@components/shared/MainLayout';
import EditUser from '@components/user/edit/EditUser';
import useMyInfo from 'hooks/useMyInfo';
import { NextPage } from 'next';

const UserEditPage: NextPage = () => {
    const { seeMyInfo } = useMyInfo();

    return (
        <MainLayout title={`${seeMyInfo?.name} 수정`}>
            <EditUser {...seeMyInfo!} />
        </MainLayout>
    );
};

export default UserEditPage;