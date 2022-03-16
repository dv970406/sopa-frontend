/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.05
 */

import type { ISkillsOfPositions } from './types/interfaces';

// 스킬셋 종류를 지정하는 파일
export const skillSet: ISkillsOfPositions = {
    frontend: [
        "react",
        "vue",
        "angular",
        "javascript",
        "nextjs",
        "jquery",
        "typescript"
    ].map(name => {
        return {
            name,
            skillImageSrc: `/frontend/${name}.png`,
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
    ].map(name => {
        return {
            name,
            skillImageSrc: `/backend/${name}.png`,
            isSelected: false,
            position: "backend"
        }
    }),
    app: [
        "flutter",
        "kotlin",
        "swift",
        "rn",
    ].map(name => {
        return {
            name,
            skillImageSrc: `/app/${name}.png`,
            isSelected: false,
            position: "app"
        }
    })
};