/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.14
 */

import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface IInput {
    type: "email" | "password" | "name" | "title" | "skills" | "description";
    register?: UseFormRegisterReturn;
    [key: string]: any;
}

const typeTranslater = (engVerType: string) => {
    let korVerType = null;
    engVerType === "name" ? korVerType = "이름" : null;
    engVerType === "email" ? korVerType = "이메일" : null;
    engVerType === "password" ? korVerType = "비밀번호" : null;
    engVerType === "title" ? korVerType = "제목" : null;
    engVerType === "skills" ? korVerType = "스킬" : null;
    engVerType === "description" ? korVerType = "설명" : null;

    return korVerType
}

export default function Input({ type, register, ...props }: IInput) {

    return (
        <>
            {type !== "description" ? (
                <div>
                    <label
                        htmlFor={type}
                    >
                        {typeTranslater(type)}
                    </label>
                    <input
                        id={type}
                        type={type === "name" ? "text" : type}
                        {...register}
                        className='
                            p-2 shadow-sm
                            border-b-2 border-b-gray-300 
                            placeholder:text-lg placeholder-gray-400
                            focus:placeholder-fuchsia-500 focus:outline-none focus:ring-fuchsia-500 focus:border-b-fuchsia-500
                            w-full
                            text-sm
                        '
                        {...props}
                    />
                </div>
            ) : null}

            {type === "description" ? (
                <div>
                    <label
                        htmlFor={type}
                    >
                        {typeTranslater(type)}
                    </label>
                    <textarea
                        id={type}
                        className={`
                            p-1 shadow-sm
                            border-b-2 border-b-gray-300  
                            placeholder:text-lg placeholder-gray-400
                            focus:placeholder-fuchsia-500 focus:outline-none focus:ring-fuchsia-500 focus:border-b-fuchsia-500
                            w-full
                            text-sm
                        `}
                    />
                </div>
            ) : null}
        </>
    )
}