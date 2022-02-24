/**
 * 생성일: 2022.02.12
 * 수정일: 2022.02.24
 */

import CreatePost from '@components/post/create/CreatePost';
import MainLayout from '@components/shared/MainLayout';
import { useResetRecoilState } from "recoil"
import { skillsState } from "@utils/atoms"
import { useEffect } from "react"

export default function PostUploadPage() {
    const resetSkillsState = useResetRecoilState(skillsState)

    useEffect(() => {
        resetSkillsState()
    }, [])
    return (
        <MainLayout title='게시물 등록'>
            <div
                className={`
                    lg:px-32
                `}
            >
                <CreatePost />
            </div>
        </MainLayout >
    )
}