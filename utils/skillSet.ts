/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.14
 */

// 스킬셋 종류를 지정하는 파일
export const skillSet = {
    frontend: [
        "react",
        "vue",
        "angular",
        "javascript",
        "nextjs",
        "jquery",
        "typescript"
    ].map(skill => {
        return {
            name: skill,
            skillImage: `/frontend/${skill}.png`,
            isSelected: false,
            position: "frontend"
        }
    }),
    backend: [
        "nodejs",
        "csharp",
        "c++",
        "django",
        "go",
        "java",
        "python",
        "ruby"
    ].map(skill => {
        return {
            name: skill,
            skillImage: `/backend/${skill}.png`,
            isSelected: false,
            position: "backend"
        }
    }),
    app: [
        "flutter",
        "kotlin",
        "swift",
        "rn",
    ].map(skill => {
        return {
            name: skill,
            skillImage: `/app/${skill}.png`,
            isSelected: false,
            position: "app"
        }
    })
}