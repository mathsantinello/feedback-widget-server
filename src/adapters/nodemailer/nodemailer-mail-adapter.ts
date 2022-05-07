import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a253d0e0798073",
      pass: "445c7d2cff8c6a"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject,body}: SendMailData){

        await transport.sendMail({
        from: 'Você do passado <voce@dopassado.com>',
        to: 'Matheus Santinello <matheus.santinello@gmail.com',
        subject,
        html: body,
    });
    };
}