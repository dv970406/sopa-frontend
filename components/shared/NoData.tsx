/**
 * 생성일: 2022.03.03
 * 수정일: ------
 */

// SearchPosts의 결과가 없을 때, profile에서 데이터가 없을 때 사용할 Component
export default function NoData() {
    return (
        <div
            className='h-screen flex flex-col items-center justify-start rounded-full space-y-2'
        >
            <img
                className="w-32 h-32 rounded-full"
                src="/sopa.png"
            />
            <p className="font-bold text-lg">데이터가 없습니다!</p>
        </div>
    )
}