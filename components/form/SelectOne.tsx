/**
 * 생성일: 2022.02.08
 * 수정일: ------
 */

import { useRecoilState } from 'recoil'
import { loginModeState } from '../../utils/atoms'

interface ISelectOne {
    leftText: string;
    rightText: string;
}

export default function SelectOne({ leftText, rightText }: ISelectOne) {
    const [loginMode, setLoginMode] = useRecoilState(loginModeState)

    const changeLoginMode = (bool: boolean) => setLoginMode(bool)

    return (
        <div
            className='
                flex align-center justify-around
                text-4xl
                mb-10
                space-x-2
                max-w-lg w-full
            '
        >
            <div
                className={
                    `
                    border-b-4 text-center hover:border-b-fuchsia-500 transition-colors w-full cursor-pointer rounded-md
                    ${loginMode ? "border-b-fuchsia-500" : "border-b-fuchsia-100"}
                    `
                }
                onClick={() => changeLoginMode(true)}
            >
                {leftText}
            </div>
            <div
                className={
                    `
                    border-b-4 text-center hover:border-b-fuchsia-500 transition-colors w-full cursor-pointer rounded-md
                    ${loginMode ? "border-b-fuchsia-100" : "border-b-fuchsia-500"}
                    `
                }
                onClick={() => changeLoginMode(false)}
            >
                {rightText}
            </div>
        </div>
    )
}