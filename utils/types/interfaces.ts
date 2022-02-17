/**
 * 생성일: 2022.02.17
 * 수정일: ------
 */

export interface IFetchedSkillsInfo {
    __typename: string;
    id: number;
    skill: string;
}

// 게시글
export interface IPost {
    __typename?: string;
    id: number;
    title: string;
    description: string;
    likeCount: number;
    commentCount: number;
    readCount: number;
    isExpired: boolean;
    frontends: IFetchedSkillsInfo[];
    backends: IFetchedSkillsInfo[];
    apps: IFetchedSkillsInfo[];
    createdAt: string;
}

// 스킬셋 관련 state
export interface ISkill {
    skill: string;
    skillImage: string;
    isSelected: boolean;
    position: string;
}

export interface ISkillPositions {
    [key: string]: ISkill[]
}