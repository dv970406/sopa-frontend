/**
 * 생성일: 2022.02.12
 * 수정일: 2022.02.15
 */

import CreatePost from '@components/post/CreatePost';
import MainLayout from '@components/shared/MainLayout';


export default function PostUpload() {

    return (
        <MainLayout title='게시물 등록'>
            <div
                className={`
                    lg:px-64
                `}
            >
                <CreatePost />
            </div>
        </MainLayout >

    )
}