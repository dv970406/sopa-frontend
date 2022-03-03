/**
 * 생성일: 2022.02.21
 * 수정일: 2022.03.03
 */

import { searchModeState } from '@utils/atoms';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import SearchPosts from './SearchPosts';


const turnOffSearchVariants = {
    invisible: {
        x: 200,
    },
    visible: {
        x: 0,
        transition: {
            duration: 0.3
        }
    }
}
export default function SearchPostsBtn() {
    const [searchMode, setSearchMode] = useRecoilState(searchModeState);

    return (
        searchMode ? (
            <SearchPosts />
        ) : (
            <motion.button
                onClick={() => setSearchMode(true)}
                variants={turnOffSearchVariants}
                initial="invisible"
                animate="visible"
                whileHover={{
                    scale: 1.1,
                    transition: {
                        duration: 0.3
                    }
                }}
                className="text-sopa-default hover:text-sopa-accent"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </motion.button>
        )
    )
}