/**
 * 생성일: 2022.02.21
 * 수정일: 2022.02.27
 */

import { gql, useLazyQuery } from '@apollo/client';
import { postsState } from '@utils/atoms';
import { POST_DISPLAY_FRAGMENT } from '@utils/fragments';
import { IPostDisplay } from '@utils/types/interfaces';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

interface ISearchInputComponent {
    setIsSearchMode(bool: boolean): void;
}

const SEARCH_POSTS_QUERY = gql`
    query searchPosts($title:String!){
        searchPosts(title:$title){
            ...PostDisplayFragment
        }
    }
    ${POST_DISPLAY_FRAGMENT}
`;

interface IForm {
    title: string;
};

interface ISearchPostsCompleted {
    searchPosts: IPostDisplay[]
};

const searchInputVariants = {
    invisible: {
        opacity: 0,
        x: 70,
    },
    visible: {
        opacity: 1,
        x: -30,
        transition: {
            duration: 0.3
        }
    }
};

export default function SearchInput({ setIsSearchMode }: ISearchInputComponent) {
    const setPosts = useSetRecoilState(postsState);

    const { register, handleSubmit, setValue } = useForm<IForm>();

    const searchPostsCompleted = ({ searchPosts }: ISearchPostsCompleted) => {
        setPosts(searchPosts);
        setValue("title", "");
    };

    const [searchPostsMutation, { loading }] = useLazyQuery(SEARCH_POSTS_QUERY, {
        onCompleted: searchPostsCompleted
    });

    const onValid = ({ title }: IForm) => {
        if (loading) return;

        searchPostsMutation({
            variables: {
                title
            }
        });
    };

    return (
        <motion.div
            variants={searchInputVariants}
            initial="invisible"
            animate="visible"
            className="
                absolute flex bg-white rounded-xl px-2 py-1 items-center space-x-2 shadow-lg
            "
        >
            <button
                onClick={() => setIsSearchMode(false)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="fuchsia">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </button>
            <form
                onSubmit={handleSubmit(onValid)}
            >
                <motion.input
                    {...register("title", {
                        required: true,
                    })}
                    type="text"
                    className="
                        rounded-r-lg border-l-2 border-l-fuchsia-300
                        focus:outline-none px-2
                    "
                    placeholder='제목을 입력하세요'
                    required
                />
            </form>
        </motion.div>
    )
}