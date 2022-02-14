/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.14
 */

import type { UseFormRegisterReturn } from 'react-hook-form';

interface IInput {
    type: "email" | "password" | "name";
    register: UseFormRegisterReturn;
    [key: string]: any;
}

export default function Input({ type, register, ...props }: IInput) {
    return (
        <>
            {type === "email" ? (
                <input
                    type="email"
                    {...register}
                    className='
                        px-4 py-2 shadow-sm rounded-md 
                        border-2 border-gray-300  
                        placeholder:text-lg placeholder-gray-400
                        focus:placeholder-fuchsia-500 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500
                        w-full
                        text-xl
                    '
                    {...props}
                />
            ) : null}

            {type === "name" ? (
                <input
                    type="text"
                    {...register}
                    className='
                        px-4 py-2 shadow-sm rounded-md 
                        border-2 border-gray-300  
                        placeholder:text-lg placeholder-gray-400
                        focus:placeholder-fuchsia-500 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500
                        w-full
                        text-xl
                    '
                    {...props}
                />
            ) : null}

            {type === "password" ? (
                <input
                    type="password"
                    {...register}
                    className='
                        px-4 py-2 shadow-sm rounded-md 
                        border-2 border-gray-300  
                        placeholder:text-lg placeholder-gray-400
                        focus:placeholder-fuchsia-500 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500
                        w-full
                        text-xl
                    '
                    {...props}
                />
            ) : null}
        </>
    )
}