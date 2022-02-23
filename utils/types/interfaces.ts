/**
 * 생성일: 2022.02.17
 * 수정일: 2022.02.23
 */

export interface IFetchedSkillsInfo {
    __typename: string;
    id: number;
    skill: string;
}

export interface IUserInfo {
    id: number;
    name: string;
}
export interface ICommentInfo {
    postId?: number;
    id: number;
    comment: string;
    user: IUserInfo;
    isMine: boolean;
}

// 게시글 관련
export interface IPostDisplay {
    //__typename?: string;
    id: number;
    title: string;
    description: string;
    user: IUserInfo;
    likeCount: number;
    isLiked: boolean;
    commentCount: number;
    readCount: number;
    isExpired: boolean;
    frontends: IFetchedSkillsInfo[];
    backends: IFetchedSkillsInfo[];
    apps: IFetchedSkillsInfo[];
    createdAt: string;
    updatedAt: string;
}
export interface IPostDetail extends IPostDisplay {
    comments: ICommentInfo[];
    openChatLink: string;
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