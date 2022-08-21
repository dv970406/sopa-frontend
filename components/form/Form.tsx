/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.05
 */

import React from 'react';

interface IFormLayoutComponent {
    children: React.ReactNode;
};

export default function FormLayout({ children }: IFormLayoutComponent) {
    // 버튼 클릭에 의존하게 하려고 form 태그를 쓰지 않음
    return (
        <div
            className='flex flex-col w-full max-w-lg px-12 pt-16 pb-8 space-y-6 border-2 shadow-md rounded-xl border-form-gray focus-within:placeholder-sopa-accent focus-within:ring-sopa-accent focus-within:border-sopa-accent focus-within:outline-none'
        >
            {children}
        </div>
    );
};