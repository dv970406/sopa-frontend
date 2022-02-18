/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.18
 */

import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface IInput {
    type: "email" | "password" | "password2" | "name" | "title" | "skills" | "description";
    register?: UseFormRegisterReturn;
    required?: boolean;
    disabled?: boolean;
    [key: string]: any;
}

const typeTranslater = (engVerType: string) => {
    let korVerType = null;
    switch (engVerType) {
        case "name":
            return korVerType = "이름";
        case "email":
            return korVerType = "이메일";
        case "password":
            return korVerType = "비밀번호";
        case "password2":
            return korVerType = "확인 비밀번호";
        case "title":
            return korVerType = "제목";
        case "skills":
            return korVerType = "스킬";
        case "description":
            return korVerType = "설명";
    }
    return korVerType
}

export default function Input({ type, register, required, disabled = false, ...props }: IInput) {

    const decideType = (type: string) => {
        switch (type) {
            case "name":
                return "text";
            case "password2":
                return "password";
            default:
                return type;
        };
    };

    return (
        <>
            {type !== "description" ? (
                <div>
                    <label
                        htmlFor={type}
                        className={`
                            flex items-center
                        `}
                    >
                        {typeTranslater(type)}
                        {required ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-1 text-fuchsia-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        ) : null}
                    </label>
                    <input
                        id={type}
                        type={decideType(type)}
                        {...register}
                        disabled={disabled}
                        className={`
                            p-2 shadow-sm 
                            border-b-2 border-b-gray-300 
                            placeholder:text-lg placeholder-gray-400
                            focus:placeholder-fuchsia-500 focus:outline-none focus:ring-fuchsia-500 focus:border-b-fuchsia-500
                            w-full
                            text-sm
                            ${disabled ? "rounded-md bg-slate-300 opacity-50" : null}
                        `}
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