/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.25
 */

import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type InputType = "email" | "password" | "password2" | "name" | "title" | "skills" | "description" | "openChatLink";
interface IInput {
    type: InputType;
    register?: UseFormRegisterReturn;
    required?: boolean;
    disabled?: boolean;
    error: string;
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
        case "openChatLink":
            return korVerType = "카카오 오픈채팅 링크";
    }
    return korVerType
}

export default function Input({ type, register, required, disabled = false, error, ...props }: IInput) {
    console.log("Received Error : ", error)
    const decideType = (type: InputType) => {
        switch (type) {
            case "name":
                return "text";
            case "password2":
                return "password";
            case "openChatLink":
                return "text";
            default:
                return type;
        };
    };

    const inputType = (type: InputType) => {
        if (type === "description") {
            return (
                <div>
                    <label
                        htmlFor={type}
                    >
                        {typeTranslater(type)}
                    </label>
                    <textarea
                        id={type}
                        {...register}
                        className={`
                            p-1 shadow-sm
                            border-b-2 border-b-gray-300  
                            placeholder:text-lg placeholder-gray-400
                            focus:placeholder-sopa-accent focus:outline-none focus:ring-sopa-accent focus:border-b-sopa-accent
                            w-full
                            text-sm
                        `}
                        rows={10}
                        cols={50}
                        {...props}
                    />
                </div>
            )
        } else if (type === "email") {
            return (
                <div>
                    <label
                        htmlFor={type}
                        className={`
                            flex items-center
                        `}
                    >
                        <p>{typeTranslater(type)}</p>
                        {required ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-1 text-sopa-accent"
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
                            peer p-2 shadow-sm
                            border-b-2 border-b-gray-300 
                            placeholder:text-lg placeholder-gray-400
                            focus:placeholder-sopa-accent focus:outline-none focus:ring-sopa-accent focus:border-b-sopa-accent
                            w-full
                            ${disabled ? "rounded-md bg-slate-300 opacity-50" : null}
                        `}
                        {...props}
                    />
                    <div
                        className='
                            p-1 invisible peer-invalid:visible text-error font-bold
                        '
                    >
                        {error}
                    </div>
                </div>
            )
        } else {
            return (
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
                                className="h-5 w-5 ml-1 text-sopa-accent"
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
                            focus:placeholder-sopa-accent focus:outline-none focus:ring-sopa-accent focus:border-b-sopa-accent
                            w-full
                            ${disabled ? "rounded-md bg-slate-300 opacity-50" : null}
                        `}
                        {...props}
                    />
                    <div
                        className='p-1 text-error font-bold'
                    >
                        {error}
                    </div>
                </div>
            )
        }
    }
    return (
        <>
            {inputType(type)}
        </>
    )

}