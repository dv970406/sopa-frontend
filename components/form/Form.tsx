/**
 * 생성일: 2022.02.08
 * 수정일: ------
 */

import React from 'react';

interface IForm {
    children: React.ReactNode
}

export default function Form({ children }: IForm) {
    return (
        <form
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