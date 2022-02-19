/**
 * 생성일: 2022.02.17
 * 수정일: 2022.02.18
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
        }
        likeCount
        isLiked
        commentCount
        readCount
        isExpired
        frontends{
            id
            skill
        }
        backends{
            id
            skill
        }
        apps{
            id
            skill
        }
        createdAt
        updatedAt
    }
`

export const POST_DETAIL_FRAGMENT = gql`
    fragment PostDetailFragment on Post{
        id
        title
        description
        user{
            id
            name
        }
        likeCount
        isLiked
        commentCount
        readCount
        isExpired
        openChatLink
        frontends{
            id
            skill
        }
        backends{
            id
            skill
        }
        apps{
            id
            skill
        }
        createdAt
        updatedAt
        comments{
            id
            comment
            user{
                id
                name
            }
        }
    }
`

export const COMMENT_FRAGMENT = gql`
    fragment CommentFragment on Comment{
        id
        comment
        user{
            id
            name
        }
    }
`