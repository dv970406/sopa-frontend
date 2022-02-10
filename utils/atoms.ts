/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.10
 */

import { atom } from 'recoil';

export const loginModeState = atom<boolean>({
    key: "loginModeState",
    default: true
});

export const tokenState = atom<string | null>({
    key: "tokenState",
    default: typeof window === "undefined" ? null : document.cookie.split("TOKEN=")[1],
});