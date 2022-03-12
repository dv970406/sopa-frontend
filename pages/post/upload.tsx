/**
 * 생성일: 2022.02.12
 * 수정일: 2022.03.05
 */

import CreatePost from '@components/post/create/CreatePost';
import MainLayout from '@components/shared/MainLayout';
import { useResetRecoilState } from "recoil";
import { skillsState } from "@utils/atoms";
import { useEffect } from "react";
import { NextPage } from 'next';

const PostUploadPage: NextPage = () => {
    const resetSkillsState = useResetRecoilState(skillsState);

    useEffect(() => {
        resetSkillsState();
    }, [resetSkillsState]);
    return (
        <MainLayout title='게시물 등록'>
            <CreatePost />
        </MainLayout >
    );
};

export default PostUploadPage;