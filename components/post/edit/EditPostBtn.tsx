/**
 * 생성일: 2022.02.21
 * 수정일: 2022.03.05
 */

import { postEditModeState } from '@utils/atoms';
import { useSetRecoilState } from 'recoil';

export default function EditPostBtn() {
    const setPostEditMode = useSetRecoilState(postEditModeState);

    return (
        <button
            onClick={() => setPostEditMode(true)}
            className={`
                p-1
            `}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                className="
                    h-5 w-5 
                    text-white opacity-50 hover:opacity-100
                    transition
                "
            >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
        </button>
    );
};