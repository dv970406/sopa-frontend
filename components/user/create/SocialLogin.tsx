/**
 * 생성일: 2022.02.17
 * 수정일: 2022.03.05
 */

import Link from "next/link";
import { makeSocialLoginReqUrl } from "@utils/utilFunctions";
import Image from "next/image";

interface ISocialLogin {
  social: "naver" | "github" | "kakao";
  isAuthPage?: boolean;
}

const SocialLogin = ({ social, isAuthPage = false }: ISocialLogin) => {
  return (
    /* 네이버는 유효기간 만료로 다시 인증해야되는데 과정이 까다로워서 일단 막아놓기 */
    <button
      disabled={social === "naver"}
      style={{
        opacity: social === "naver" ? 0.3 : 1,
        pointerEvents: social === "naver" ? "none" : "auto",
      }}
    >
      <Link href={makeSocialLoginReqUrl({ socialSite: social })} passHref>
        <Image
          src={`/${social}.png`}
          alt={social}
          width={isAuthPage ? 50 : 40}
          height={isAuthPage ? 50 : 40}
        />
      </Link>
    </button>
  );
};

export default SocialLogin;
