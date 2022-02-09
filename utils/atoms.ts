/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.09
 */

import { atom } from 'recoil';

export const loginModeState = atom<boolean>({
    key: "loginModeState",
    default: true
});

export const tokenState = atom<string | null>({
    key: "tokenState",
    default: null
});