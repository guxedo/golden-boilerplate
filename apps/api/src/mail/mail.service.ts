import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
            port: Number(process.env.MAIL_PORT) || 2525,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    async sendVerificationEmail(email: string, token: string) {
        const url = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify?token=${token}`;

        await this.transporter.sendMail({
            from: '"My Golden Stack" <noreply@example.com>',
            to: email,
            subject: 'Verify your Email',
            html: `
                <h1>Welcome!</h1>
                <p>Please click the link below to verify your email address:</p>
                <a href="${url}">Verify Email</a>
                <p>If you did not request this, please ignore this email.</p>
            `,
        });
    }
}
