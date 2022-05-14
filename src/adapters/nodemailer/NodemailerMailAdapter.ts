import { MailAdapter, SendMailData } from './../MailAdapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "dffcace0bf7663",
        pass: "deca090632c1e7"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: "Equipe Feedget <suporte@feedget.com>",
            to: "Eduardo <eduardo.sp6@gmail.com>",
            subject,
            html: body
        });
    }
}