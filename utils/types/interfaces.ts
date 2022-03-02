/**
 * 생성일: 2022.02.17
 * 수정일: 2022.03.02
 */

export interface IMutationResults {
    [key: string]: {
        ok: boolean;
        error?: string;
    }
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
    isMine: boolean;
}

// 댓글
export interface ICommentInfo {
    postId?: number;
    id: number;
    comment: string;
    user: IUserInfo;
    isMine: boolean;
}

// 유저 관련
export interface IUserInfo {
    id: number;
    name: string;
}


// 스킬셋 관련
export interface ISkill {
    skill: string;
    skillImage: string;
    isSelected: boolean;
    position: string;
}

export interface ISkillPositions {
    [key: string]: ISkill[]
}

export interface IFetchedSkillsInfo {
    __typename: string;
    id: number;
    skill: string;
}