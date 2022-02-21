/**
 * 생성일: 2022.02.21
 * 수정일: ------
 */

import { motion } from 'framer-motion';
import { useState } from 'react';
import SearchInput from './SearchInput';


const offVar = {
    invisible: {
        x: -150,
    },
    visible: {
        x: 0,
        transition: {
            duration: 0.3
        }
    }
}
export default function SearchInputBtn() {
    const [isSearchMode, setIsSearchMode] = useState(false);

    return (
        isSearchMode ? (
            <SearchInput setIsSearchMode={setIsSearchMode} />
        ) : (
            <motion.button
                onClick={() => setIsSearchMode(true)}
                variants={offVar}
                initial="invisible"
                animate="visible"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </motion.button>
        )
    )
}