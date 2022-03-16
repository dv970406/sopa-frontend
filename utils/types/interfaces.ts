/**
 * 생성일: 2022.02.17
 * 수정일: 2022.03.16
 */

export interface IMutationResults {
    [key: string]: {
        ok: boolean;
        error?: string;
    }
};

// 게시글 관련
export interface IPostSemiDetailInfo {
    //__typename?: string;
    id: number;
    title: string;
    description?: string;
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
};

export interface IPostDetailInfo extends IPostSemiDetailInfo {
    comments: ICommentInfo[];
    openChatLink: string;
    isMine: boolean;
};

// 댓글
export interface ICommentInfo {
    postId?: number;
    id: number;
    comment: string;
    user: IUserInfo;
    isMine: boolean;
    createdAt: string;
};

// 유저 관련
export interface IUserInfo {
    id: number;
    name: string;
    githubURL?: string;
};


// 스킬셋 관련

export interface ISkillImage {
    name: string;
    skillImageSrc: string;
};

export interface ISkillInfo extends ISkillImage {
    isSelected: boolean;
    position: string;
};

export interface ISkillsOfPositions {
    [key: string]: ISkillInfo[]
};

export interface IFetchedSkillsInfo {
    __typename: string;
    id: number;
    name: string;
};