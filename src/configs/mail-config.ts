import * as nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    requireTLS: process.env.SMTP_TLS === 'true',
    auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export default transport;