/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.09
 */

import { atom, selector } from 'recoil';

export const loginModeState = atom<boolean>({
    key: "loginModeState",
    default: true
});

export const tokenState = atom<string>({
    key: "tokenState",
    default: ""
});

export const isLoggedInSelector = selector<boolean>({
    key: "isLoggedInSeletor",
    get: ({ get }) => {
        const token = get(tokenState)
        return token ? true : false
    }
});