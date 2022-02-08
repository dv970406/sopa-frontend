/**
 * 생성일: 2022.02.08
 * 수정일: ------
 */

import { atom, selector } from 'recoil';

export const loginModeState = atom({
    key: "loginModeState",
    default: true
})

export const loginState = atom({
    key: "loginState",
    default: false
})

export const tokenState = atom<string>({
    key: "tokenState",
    default: ""
})

export const isLoggedInSelector = selector<boolean>({
    key: "isLoggedInSelector",
    get: ({ get }) => {
        const token = get(tokenState);
        if (token) localStorage.setItem("TOKEN", token);
        return token ? true : false
    }
})