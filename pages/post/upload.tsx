/**
 * 생성일: 2022.02.12
 * 수정일: 2022.02.14
 */

import MainLayout from '@components/shared/MainLayout';

export default function PostUpload() {
    return (
        <MainLayout title='게시물 등록'>
            <div
                className={`
                    lg:px-64
                `}
            >
                <form
                    className={`
                        space-y-10
                    `}
                >
                    <div
                        className={`
                            flex flex-col
                            space-y-3
                        `}
                    >
                        <label
                            htmlFor='title'
                        >
                            제목
                        </label>
                        <input
                            id='title'
                            className={`
                                    border-b-2 border-b-fuchsia-200
                                `}
                        />
                    </div>

                    <div
                        className={`
                            flex flex-col
                            space-y-5
                        `}
                    >
                        <label
                            htmlFor='skills'
                        >
                            Skill
                        </label>
                        <input
                            id='skills'
                            className={`
                                border-b-2 border-b-fuchsia-200
                            `}
                        />
                    </div>

                    <div
                        className={`
                            flex flex-col
                            space-y-5
                        `}
                    >
                        <label
                            htmlFor='description'
                        >
                            설명
                        </label>
                        <textarea
                            id='description'
                            className={`
                                border-b-2 border-b-fuchsia-200
                            `}
                        >

                        </textarea>
                    </div>
                </form>
            </div>
        </MainLayout >

    )
}