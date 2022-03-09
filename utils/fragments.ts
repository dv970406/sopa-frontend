/**
 * 생성일: 2022.02.17
 * 수정일: 2022.03.09
 */

import { gql } from '@apollo/client';

export const POST_DISPLAY_FRAGMENT = gql`
    fragment PostDisplayFragment on Post{
        id
        title
        description
        user{
            id
            name
            githubURL
        }
        likeCount
        isLiked
        commentCount
        readCount
        isExpired
        frontends{
            id
            name
        }
        backends{
            id
            name
        }
        apps{
            id
            name
        }
        openChatLink
        createdAt
        updatedAt
        isMine
    }
`;

export const COMMENT_FRAGMENT = gql`
    fragment CommentFragment on Comment{
        id
        comment
        user{
            id
            name
        }
        postId
        isMine
    }
`;

export const USER_SIMPLE_FRAGMENT = gql`
    fragment UserSimpleFragment on User{
        id
        githubURL
        socialLogin
        name
        email
        isMe
    }
`;

export const USER_DETAIL_FRAGMENT = gql`
    fragment UserDetailFragment on User{
        id
        socialLogin
        name
        email
        likeCount
        postCount
        commentCount
        isMe
    }
`;