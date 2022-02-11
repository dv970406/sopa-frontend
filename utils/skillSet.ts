/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.11
 */

// 스킬셋 종류를 지정하는 파일

/* export const skillSet = {
    frontend: [
        {
            skill: "react",
            skillImage: "/frontend/react.png"
        },
        {
            skill: "vue",
            skillImage: "/frontend/vue.png"
        },
        {
            skill: "angular",
            skillImage: "/frontend/angular.png"
        },
        {
            skill: "javascript",
            skillImage: "/frontend/javascript.png"
        },
        {
            skill: "jquery",
            skillImage: "/frontend/jquery.png"
        },
        {
            skill: "nextjs",
            skillImage: "/frontend/nextjs.png"
        },
        {
            skill: "typescript",
            skillImage: "/frontend/typescript.png"
        },
    ],
    backend: [
        {
            skill: "cshop",
            skillImage: "/backend/cshop.png"
        },
        {
            skill: "c++",
            skillImage: "/backend/c++.png"
        },
        {
            skill: "django",
            skillImage: "/backend/django.png"
        },
        {
            skill: "go",
            skillImage: "/backend/go.png"
        },
        {
            skill: "java",
            skillImage: "/backend/java.png"
        },
        {
            skill: "python",
            skillImage: "/backend/python.png"
        },
        {
            skill: "ruby-on-rails",
            skillImage: "/backend/ruby-on-rails.png"
        },
    ],
    app: [
        {
            skill: "flutter",
            skillImage: "/app/flutter.png",
        },
        {
            skill: "java",
            skillImage: "/app/java.png",
        },
        {
            skill: "kotlin",
            skillImage: "/app/kotlin.png",
        },
        {
            skill: "swift",
            skillImage: "/app/swift.png",
        },
    ]
} */

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
            skill,
            skillImage: `/frontend/${skill}.png`
        }
    }),
    backend: [
        "cshop",
        "c++",
        "django",
        "go",
        "java",
        "python",
        "ruby-on-rails"
    ].map(skill => {
        return {
            skill,
            skillImage: `/backend/${skill}.png`
        }
    }),
    app: [
        "flutter",
        "java",
        "kotlin",
        "swift"
    ].map(skill => {
        return {
            skill,
            skillImage: `/app/${skill}.png`
        }
    })
}

console.log(["react", "vue", "angular", "javascript", "nextjs", "jquery", "typescript"].map(skill => {
    return {
        skill,
        skillImage: `/frontend/${skill}.png`
    }
}))