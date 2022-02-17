/**
 * 생성일: 2022.02.17
 * 수정일: ------
 */

import { gql } from '@apollo/client';

export const POST_DISPLAY_FRAGMENT = gql`
    fragment PostDisplayFragment on Post{
        id
        title
        description
        likeCount
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
    }
`