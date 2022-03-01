/**
 * 생성일: 2022.02.17
 * 수정일: 2022.02.23
 */

import Link from 'next/link'
import { makeSocialLoginReqUrl } from "@utils/utilFunctions";


interface ISocialLogin {
    social: string;
    isAuthPage?: boolean;
}

const SocialLogin = ({ social, isAuthPage = false }: ISocialLogin) => {

    return (
        <div
            className={`
                cursor-pointer
                ${isAuthPage ? "w-14 h-14" : "w-10 h-10"}
            `}
        >
            <Link href={makeSocialLoginReqUrl(social)}>
                <img className='w-full h-full' src={`/${social}.png`} />
            </Link>
        </div>
    )
}

export default SocialLogin