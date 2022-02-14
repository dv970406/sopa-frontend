/**
 * 생성일: 2022.02.12
 * 수정일: 2022.02.14
 */

import Input from '@components/form/Input';
import MainLayout from '@components/shared/MainLayout';

export default function PostUpload() {
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

                    <Input
                        type="skills"
                    />

                    <Input
                        type="description"
                    />
                </form>
            </div>
        </MainLayout >

    )
}