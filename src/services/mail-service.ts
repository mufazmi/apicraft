import transport from '../configs/mail-config';
import mailTemplate from '../templates/mail-template';

class MailService {


    sendMail = async ({type,name,to,code}:{type:string,name:string,to:string,code?:string}) =>{
        const {subject,body} = mailTemplate.getMailData({type,name,code});
        const response = await this._sendEmail(to,subject,body);
    }

    async _sendEmail(to: string, subject: string, body: string,from?:string ): Promise<void> {
        const mailOptions = {
            from: process.env.SMTP_AUTH_USER,
            to,
            subject,
            html: body,
        };
        const response = await transport.sendMail(mailOptions);
    }
}

export default new MailService();