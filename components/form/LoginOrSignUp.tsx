/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.11
 */

import { loginModeState } from '@utils/atoms';
import { useRecoilState } from 'recoil'

interface ISelectOne {
    leftText: string;
    rightText: string;
}

export default function LoginOrSignUp({ leftText, rightText }: ISelectOne) {
    const [loginMode, setLoginMode] = useRecoilState(loginModeState);
    const changeLoginMode = (bool: boolean) => setLoginMode(bool);

    return (
        <div
            className="
                flex align-center justify-around
                max-w-lg w-full mb-10 space-x-2
                text-4xl
            "
        >
            <div
                className={`
                    rounded-md
                    w-full 
                    text-2xl border-b-4 text-center hover:border-b-sopa-accent 
                    ${loginMode ? "border-b-sopa-accent" : "border-b-fuchsia-100"}
                    transition-colors cursor-pointer
                `}
                onClick={() => changeLoginMode(true)}
            >
                <p className='mb-2'>{leftText}</p>
            </div>
            <div
                className={`
                    rounded-md
                    w-full 
                    text-2xl border-b-4 text-center hover:border-b-sopa-accent
                    ${loginMode ? "border-b-fuchsia-100" : "border-b-sopa-accent"}
                    transition-colors cursor-pointer 
                `}
                onClick={() => changeLoginMode(false)}
            >
                <p className='mb-2'>{rightText}</p>
            </div>
        </div>
    )
}