/**
 * 생성일: 2022.02.08
 * 수정일: ------
 */

export default function Input({ ...props }) {
    return (
        <input
            className='
                px-4 py-2 shadow-sm rounded-md 
                border-2 border-gray-300  
                placeholder:text-lg placeholder-gray-400
                focus:placeholder-fuchsia-500 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500
                w-full
                text-xl
                
            '
            {...props}
        />
    )
}