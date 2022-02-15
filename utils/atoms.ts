/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.15
 */

import { atom, selector } from 'recoil';
import { skillSet } from './skillSet';

// LoginOrSignUp Component에서 사용하는 로그인/회원가입 화면 결정
export const loginModeState = atom<boolean>({
    key: "loginModeState",
    default: true
});

// 앱이 렌더되면 쿠키에서 토큰을 꺼내 state에 저장한다.
export const tokenState = atom<string | null>({
    key: "tokenState",
    default: typeof window === "undefined" ? null : document.cookie.split("TOKEN=")[1],
});


// 스킬셋 관련 state
export interface ISkill {
    skill: string;
    skillImage: string;
    isSelected: boolean;
    position: string;
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

export const selectedSkillsState = atom<ISkill[]>({
    key: "selectedSkillsState",
    default: []
})


export type KindOfPosition = "frontend" | "backend" | "app"
export const selectedPositionState = atom<KindOfPosition>({
    key: "selectedPositionState",
    default: "frontend"
})

export const selectedSkillsToUploadState = atom<ISkill[]>({
    key: "selectedSkillsToUploadState",
    default: []
})


export const skillsOfPositionSelector = selector<ISkill[]>({
    key: "skillsOfPositionSelector",
    get: ({ get }) => {
        const selectedPosition = get(selectedPositionState)
        const skills = get(skillsState)

        return skills[selectedPosition]
    }
})