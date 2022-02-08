/**
 * 생성일: 2022.02.08
 * 수정일: ------
 */

import Divider from '../form/Divider';
import Form from '../form/Form';
import FormButton from '../form/FormButton';
import Input from '../form/Input';


export default function Login() {
    return (
        <Form>
            <Input
                type="text"
                placeholder="이메일"
            />
            <Input
                type="password"
                placeholder="비밀번호"
            />
            <FormButton
                onClick={() => null}
                text="로그인"
            />
            <Divider text="소셜 로그인" />
            <div
                className={`
                    flex space-x-5
                    w-full
                    justify-center
                    items-center
                `}
            >
                <img className='w-12 h-12' src="/naver.png" />
                <img className='w-12 h-12' src="/github.png" />
                <img className='w-12 h-12' src="/kakaotalk.png" />
            </div>
        </Form>
    )
}