/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.01
 */

import { atom, selector } from 'recoil';
import { skillSet } from './skillSet';
import type { ICommentInfo, IPostDisplay, ISkill, ISkillPositions } from './types/interfaces';
import type { kindOfArrangementMethod, kindOfMyActivitiesTab, KindOfPosition } from './types/types';

// LoginOrSignUp Component에서 사용하는 로그인/회원가입 화면 결정
export const loginModeState = atom<boolean>({
    key: "loginModeState",
    default: true
});

export const postEditModeState = atom<boolean>({
    key: "postEditMode",
    default: false
})
export const searchModeState = atom<boolean>({
    key: "searchModeState",
    default: false
})

export const postArrangementMethodState = atom<kindOfArrangementMethod>({
    key: "postArrangementMethodState",
    default: "new"
})
export const myActivitiesTabState = atom<kindOfMyActivitiesTab>({
    key: "myActivitiesTabState",
    default: "like"
})


// 브라우저가 렌더링되면 쿠키에서 토큰을 꺼내 state에 저장한다.
export const tokenState = atom<string | null>({
    key: "tokenState",
    default: typeof window === "undefined" ? null : localStorage.getItem("TOKEN"),
});

export const postsState = atom<IPostDisplay[]>({
    key: "postsState",
    default: []
})

export const commentsState = atom<ICommentInfo[]>({
    key: "commentsState",
    default: []
})



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