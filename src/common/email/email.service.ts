import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {
  }


  async send() {
    await this.mailerService.sendMail({
      to: '1213787373@qq.com',
      from: 'xx12137@qq.com',
      subject: 'Testing Nest Mailermodule with templates ✔',
      template: 'welcome', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
      context: {
        // Data to be sent to templates engine.
        code: 'cf1a3f828287',
        name: 'john doe',
      },
    }).then(() => {
      console.log('邮件发送成功');
    }).catch((err) => {
      console.log('邮件发送失败', err);
    });
  }


}