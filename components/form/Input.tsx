/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.03
 */

import React, { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type InputType = "email" | "password" | "password2" | "name" | "title" | "skills" | "description" | "openChatLink";
interface IInput {
    type: InputType;
    register?: UseFormRegisterReturn;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    [key: string]: any;
}

// 건네받은 type을 한글로 변경
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
    return korVerType;
};

// 건네받은 type에 따라 input에 지정할 type을 지정
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

export default function Input({ type, register, required, disabled = false, error, ...props }: IInput) {

    // 글자수 세는 기능
    const [checkTextCount, setCheckTextCount] = useState(0);
    const changeTextCount = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCheckTextCount(+event.currentTarget.value?.length);
    };

    // input type에 따라 다른 JSX return
    const inputType = (type: InputType) => {
        if (type === "description") {
            return (
                <div className="space-y-2">
                    <label
                        className='font-bold'
                        htmlFor={type}
                    >
                        {typeTranslater(type)}
                    </label>
                    <textarea
                        id={type}
                        {...register}
                        className="
                            rounded-t-lg 
                            w-full p-3
                            border-b-2 border-b-form-gray text-sm shadow-sm
                            dark:bg-dark-default 
                            placeholder:text-lg
                            focus:placeholder-sopa-accent focus:outline-none 
                            focus:ring-sopa-accent focus:border-b-sopa-accent
                        "
                        rows={10}
                        cols={50}
                        {...props}
                        onChange={changeTextCount}
                    />
                    <p className='font-bold text-right'>{checkTextCount} / 1000</p>
                </div>
            )
        } else if (type === "email") {
            return (
                <div className="space-y-2">
                    <label
                        htmlFor={type}
                        className="
                            flex items-center font-bold
                        "
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
                            rounded-t-lg
                            w-full p-2 
                            border-b-2 border-b-form-gray 
                            dark:bg-dark-default shadow-sm
                            ${disabled ? "bg-slate-300 opacity-40 dark:bg-dark-ultra" : null}
                            placeholder:text-lg placeholder-form-gray
                            focus:placeholder-sopa-accent focus:outline-none 
                            focus:ring-sopa-accent focus:border-b-sopa-accent
                        `}
                        {...props}
                        onChange={changeTextCount}
                    />
                    <div
                        className="
                            text-emphasize font-bold
                        "
                    >
                        {error}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="space-y-2">
                    <label
                        htmlFor={type}
                        className="
                            flex items-center 
                            font-bold
                        "
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
                            rounded-t-lg
                            w-full p-2 
                            border-b-2 border-b-form-gray 
                            ${disabled ? "rounded-md bg-slate-300 opacity-50" : null}
                            dark:bg-dark-default shadow-sm
                            placeholder:text-lg placeholder-form-gray
                            focus:placeholder-sopa-accent focus:outline-none 
                            focus:ring-sopa-accent focus:border-b-sopa-accent
                        `}
                        {...props}
                        onChange={changeTextCount}
                    />
                    <div
                        className="
                            text-emphasize font-bold
                        "
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