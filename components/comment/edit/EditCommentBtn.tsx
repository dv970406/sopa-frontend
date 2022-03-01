/**
 * 생성일: 2022.02.21
 * 수정일: 2022.03.01
 */

import React from 'react';

interface IEditCommentBtnComponent {
    setEditCommentMode(current: any): void;
}

export default function EditCommentBtn({ setEditCommentMode }: IEditCommentBtnComponent) {

    return (
        <button
            onClick={() => setEditCommentMode((current: any) => !current)}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20" fill="currentColor"
                className={`
                    h-6 w-6 text-sopa-pure hover:text-sopa-accent cursor-pointer transition
                `}
            >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
        </button>
    )
}