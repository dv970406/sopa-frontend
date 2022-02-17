/**
 * 생성일: 2022.02.17
 * 수정일: ------
 */

import { makeSocialLoginReqUrl } from '@utils/makeSocialLoginReqUrl'
import Link from 'next/link'

interface ISocialLogin {
    social: string;
}

const SocialLogin = ({ social }: ISocialLogin) => {

    return (
        <div
            className={`
                cursor-pointer
            `}
        >
            <Link href={makeSocialLoginReqUrl(social)}>
                <img className='w-12 h-12' src={`/${social}.png`} />
            </Link>
        </div>
    )
}

export default SocialLogin