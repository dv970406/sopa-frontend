/**
 * 생성일: 2022.02.08
 * 수정일: ------
 */

import Button from './Button';

export default function NavBar() {
    const isLoggedIn = false;
    return (
        <div className='flex justify-between items-center px-10 h-20 shadow-xl'>
            <div className='w-8 h-8 rounded-full bg-slate-600' />
            <div>
                {isLoggedIn ? (
                    "yes"
                ) : (
                    <Button isFull={false} />
                )}
            </div>
        </div>
    )
}