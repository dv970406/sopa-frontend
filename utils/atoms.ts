/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.11
 */

import { atom } from 'recoil';
import { skillSet } from './skillSet';

export const loginModeState = atom<boolean>({
    key: "loginModeState",
    default: true
});

export const tokenState = atom<string | null>({
    key: "tokenState",
    default: typeof window === "undefined" ? null : document.cookie.split("TOKEN=")[1],
});

export interface ISkill {
    skill: string;
    skillImage: string;
}

interface ISkillPositions {
    [key: string]: ISkill[]
}

export const skillsState = atom<ISkillPositions>({
    key: "skillsState",
    default: {
        "frontend": skillSet.frontend,
        "backend": skillSet.backend,
        "app": skillSet.app
    }
})
