/**
 * 생성일: 2022.02.08
 * 수정일: ------
 */

import React from 'react';

interface IForm {
    children: React.ReactNode;
    onSubmit(): void;
}

export default function Form({ children, onSubmit }: IForm) {
    return (
        <form
            onSubmit={onSubmit}
            className='
                flex flex-col space-y-3
                px-12 pt-16 pb-8
                max-w-lg w-full
                border-2 border-gray-300 rounded-xl
                focus-within:placeholder-fuchsia-500 focus-within:ring-fuchsia-500 focus-within:border-fuchsia-500 focus-within:outline-none 
                shadow-md
            '
        >
            {children}
        </form>
    )
}