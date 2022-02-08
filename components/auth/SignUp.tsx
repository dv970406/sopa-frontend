/**
 * 생성일: 2022.02.08
 * 수정일: ------
 */

import Form from '../form/Form';
import FormButton from '../form/FormButton';
import Input from '../form/Input';


export default function SignUp() {
    return (
        <Form>
            <Input
                type="text"
                placeholder="이름"
            />
            <Input
                type="text"
                placeholder="이메일"
            />
            <Input
                type="password"
                placeholder="비밀번호"
            />
            <Input
                type="password"
                placeholder="비밀번호 확인"
            />
            <FormButton
                text='회원가입'
                onClick={() => null}
            />
        </Form>
    )
}