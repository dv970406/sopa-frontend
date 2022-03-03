/**
 * 생성일: 2022.02.21
 * 수정일: 2022.02.25
 */

import DeletePost from './delete/DeletePost'
import EditPostBtn from './edit/EditPostBtn'

interface IMenuBtnComponent {
    postId: number;
}

// SeePostDetail에서 사용하는 post의 소유자만이 접근 가능한 관리 패널
export default function MenuBtn({ postId }: IMenuBtnComponent) {
    return (
        <div
            className={`
                relative flex flex-col items-center
                group cursor-pointer
            `}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                className={`
                    h-7 w-7 text-sopa-default hover:text-sopa-accent transition
                `}
            >
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>

            <div
                className={`
                    transition absolute hidden top-6 group-hover:flex space-x-1
                    bg-sopa-pure rounded-full p-1.5
                `}
            >
                <EditPostBtn />
                <DeletePost postId={postId} />
            </div>
        </div>
    )
}