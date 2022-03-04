/**
 * 생성일: 2022.02.12
 * 수정일: 2022.03.01
 */

import CreatePost from '@components/post/create/CreatePost';
import MainLayout from '@components/shared/MainLayout';
import { useResetRecoilState } from "recoil";
import { skillsState } from "@utils/atoms";
import { useEffect } from "react";
import dynamic from 'next/dynamic';

export default function PostUploadPage() {
    const resetSkillsState = useResetRecoilState(skillsState);
    const NoSsrCreatePost = dynamic(
        () => import('@components/post/create/CreatePost'),
        { ssr: false }
    );

    useEffect(() => {
        resetSkillsState();
    }, [])
    return (
        <MainLayout title='게시물 등록'>
            <div
                className={`md:px-28 lg:px-52 xl:px-96 space-y-8`}
            >
                <NoSsrCreatePost />
            </div>
        </MainLayout >
    )
}