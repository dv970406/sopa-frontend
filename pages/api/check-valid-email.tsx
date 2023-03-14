/**
 * 생성일: 2022.02.23
 * 수정일: 2022.03.05
 */

import mail from "@sendgrid/mail";
import next, { NextApiRequest, NextApiResponse } from "next";

export default function Hanlder(req: NextApiRequest, res: NextApiResponse) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  if (!SENDGRID_API_KEY) return;
  mail.setApiKey(SENDGRID_API_KEY);
  const { email } = req.body;

  // 5~6자리 랜덤코드 생성
  const sendedCode = Number(
    String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
  );

  const sendEmail = {
    to: email,
    from: process.env.ADMIN_EMAIL!,
    subject: "소파 이메일 인증번호입니다.",
    text: "안녕하세요 소파입니다.",
    html: `<h1>SOPA</h1><div>이메일 인증번호는 <strong>${sendedCode}</strong>입니다.</div>`,
  };

  // 이메일 전송
  return mail
    .send(sendEmail)
    .then((response) => {
      res.status(200).json({
        ok: true,
        message: "이메일 전송에 성공했습니다. 인증번호를 확인해주세요.",
        sendedCode,
      });
    })
    .catch(() => {
      res.status(404).json({
        ok: false,
        message: "이메일 전송에 실패했습니다.",
      });
    });
}
