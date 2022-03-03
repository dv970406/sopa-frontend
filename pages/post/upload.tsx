/**
 * 생성일: 2022.02.12
 * 수정일: 2022.03.01
 */

import CreatePost from '@components/post/create/CreatePost';
import MainLayout from '@components/shared/MainLayout';
import { useRecoilValue, useResetRecoilState } from "recoil";
import { skillsState, tokenState } from "@utils/atoms";
import { useLayoutEffect } from "react";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

export default function PostUploadPage() {
    const resetSkillsState = useResetRecoilState(skillsState);
    const token = useRecoilValue(tokenState);
    const router = useRouter();
    const NoSsrCreatePost = dynamic(
        () => import('@components/post/create/CreatePost'),
        { ssr: false }
    );

    // NoSsr로 화면이 미리 보여지는 것을 막고 useLayoutEffect로 앱 페인트 전에 함수를 실행시킨다고 해서 딱히 유용할지는 모르겠다.
    useLayoutEffect(() => {
        if (!token) router.back();
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