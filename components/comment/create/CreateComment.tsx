/**
 * 생성일: 2022.02.20
 * 수정일: 2022.03.10
 */

import { gql, MutationUpdaterFn, useMutation } from '@apollo/client';
import Button from '@components/shared/Button';
import { COMMENT_FRAGMENT } from '@utils/fragments';
import { ICommentInfo } from '@utils/types/interfaces';
import useMyInfo from 'hooks/useMyInfo';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($postId:Int!,$comment:String!){
        createComment(postId:$postId,comment:$comment){
            ...CommentFragment
        }
    }
    ${COMMENT_FRAGMENT}
`;

interface IForm {
    comment: string;
}
interface ICreateCommentComponent {
    postId: number;
}

export default function CreateComment({ postId }: ICreateCommentComponent) {
    const { seeMyInfo } = useMyInfo();

    // 글자수 세는 기능
    const [checkTextCount, setCheckTextCount] = useState(0);
    const changeTextCount = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCheckTextCount(+event.currentTarget.value?.length);
    };

    const { register, handleSubmit, setValue } = useForm<IForm>();

    // createComment Mutation 처리 후 cache 수정작업
    const updateCreateComment: MutationUpdaterFn = (cache, { data }) => {
        const { createComment }: any = data;
        if (!createComment.id) {
            alert("잘못된 접근입니다.");
            return;
        };

        /* 
            writeFragment 작성 후 Post의 comment cache에 추가해주어야 Comment:id의 형태로 __ref로써 참고하게 되더라.
            writeFragment 없이 단순 modify만 한 경우 createComment를 하고 새로고침하고 editComment하면 문제는 없으나 createComment를 한 후 새로고침 없이 바로 editComment를 하려고 하면
            __ref로 참고하는 것이 아니라 Post의 comments cache 배열과 내가 수정하는 comment가 따로 놀아서 반영되지 않더라
        */
        const newComment = cache.writeFragment({
            id: `Comment:${createComment.id}`,
            fragment: gql`
                fragment dsa on Comment{
                    id
                    comment
                    user{
                        id
                        name
                    }
                }
            `,
            data: {
                ...createComment
            }
        });

        // 추가한 comment를 cache에 반영
        cache.modify({
            id: `Post:${postId}`,
            fields: {
                commentCount(prev) {
                    return prev + 1
                },
                comments(prev) {
                    return [newComment, ...prev]
                }
            }
        });
        cache.modify({
            id: `ROOT_QUERY`,
            fields: {
                seeMyComments(prev) {
                    return [newComment, ...prev]
                }
            }
        });

        // user의 commentCount를 +1
        cache.modify({
            id: `User:${seeMyInfo?.id}`,
            fields: {
                commentCount(prev) {
                    return prev + 1
                }
            }
        });

        setValue("comment", "");
    };

    const [createCommentMutation, { loading }] = useMutation<ICommentInfo>(CREATE_COMMENT_MUTATION, {
        update: updateCreateComment
    });

    // form 제출 시 Mutation이 실행된다.
    const onValid = ({ comment }: IForm) => {
        if (loading) return;

        createCommentMutation({
            variables: {
                postId,
                comment
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onValid)}
            className="
                flex flex-col rounded-lg
                w-full  
                border-2 border-sopa-default 
                focus-within:border-[2.5px] focus-within:border-sopa-accent
                transition
            "
        >
            <textarea
                {...register("comment", {
                    required: true,
                    maxLength: {
                        value: 200,
                        message: "200글자 미만이어야 합니다."
                    }
                })}
                className="p-4 rounded-md  dark:bg-dark-default focus:outline-none"
                rows={5}
                cols={50}
                placeholder="댓글을 입력하세요"
                maxLength={200}
                onChange={changeTextCount}
                required
            />
            <div
                className={`
                        flex items-center place-content-end
                        w-full p-2 space-x-2
                        border-t-2 border-t-sopa-default
                    `}
            >
                <p className='font-bold'>{checkTextCount} / 200</p>
                <Button text="추가" />
            </div>
        </form>
    );
};