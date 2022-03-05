/**
 * 생성일: 2022.02.17
 * 수정일: 2022.03.05
 */

import Link from 'next/link';
import { makeSocialLoginReqUrl } from "@utils/utilFunctions";
import Image from 'next/image';

interface ISocialLogin {
    social: "naver" | "github" | "kakao";
    isAuthPage?: boolean;
};

const SocialLogin = ({ social, isAuthPage = false }: ISocialLogin) => {
    return (
        <button>
            <Link href={makeSocialLoginReqUrl(social)} passHref>
                <Image
                    src={`/${social}.png`}
                    alt=""
                    width={isAuthPage ? 50 : 40}
                    height={isAuthPage ? 50 : 40}
                />
            </Link>
        </button>
    );
};

export default SocialLogin;