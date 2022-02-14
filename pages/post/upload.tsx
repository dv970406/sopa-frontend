/**
 * 생성일: 2022.02.12
 * 수정일: 2022.02.14
 */

import Input from '@components/form/Input';
import PositionSelector from '@components/form/PositionSelector';
import MainLayout from '@components/shared/MainLayout';
import { selectedSkillsState } from '@utils/atoms';
import { useRecoilValue } from 'recoil';

export default function PostUpload() {
    const selectedSkills = useRecoilValue(selectedSkillsState)

    return (
        <MainLayout title='게시물 등록'>
            <div
                className={`
                    lg:px-64
                `}
            >
                <form
                    className={`
                        space-y-10
                    `}
                >
                    <Input
                        type="title"
                    />

                    <PositionSelector

                    />

                    <Input
                        type="description"
                    />
                </form>
            </div>
        </MainLayout >

    )
}