/**
 * 생성일: 2022.02.21
 * 수정일: ------
 */

export const buttonHoverEvent = (color: string) => {
    return `flex justify-center items-center bg-${color}-300 hover:bg-${color}-400 transition text-white font-bold rounded-lg px-3 py-2`
}