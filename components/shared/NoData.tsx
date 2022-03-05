/**
 * 생성일: 2022.03.05
 * 수정일: ------
 */

// SearchPosts의 결과가 없을 때, profile에서 데이터가 없을 때 사용할 Component
export default function NoData() {
    return (
        <div
            className="
                flex flex-col items-center justify-start rounded-full 
                h-screen space-y-2
            "
        >
            <img
                className="rounded-full w-32 h-32"
                src="/sopa.png"
            />
            <p className="font-bold text-lg">데이터가 없습니다!</p>
        </div>
    );
};