/**
 * 생성일: 2022.02.23
 * 수정일: ------
 */

import mail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

mail.setApiKey(process.env.SENDGRID_API_KEY!);

export default function Hanlder(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.body;

    // 6자리 랜덤코드 생성
    const sendedCode = Number((Number(Math.random().toFixed(6)) * 1000000).toFixed(0).padStart(6, "0"));

    const sendEmail = {
        to: email,
        from: process.env.ADMIN_EMAIL!,
        subject: "소파 이메일 인증번호입니다.",
        text: "안녕하세요 소파입니다.",
        html: `<h1>SOPA</h1><div>이메일 인증번호는 <strong>${sendedCode}</strong>입니다.</div>`
    };

    // 이메일 전송
    mail.send(sendEmail)
        .then(() => {
            return res.status(200).json({
                ok: true,
                message: "이메일 전송에 성공했습니다. 인증번호를 확인해주세요.",
                sendedCode,
            });
        })
        .catch((error) => {
            return res.status(404).json({
                ok: false,
                message: "이메일 전송에 실패했습니다."
            });
        });

}