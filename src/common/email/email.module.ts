import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { EmailService } from '@/common/email/email.service';

// 验证一下路径
console.log('TEMPLATE DIR:', join(__dirname, '..', 'email/templates'));


@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        // transport定义你要使用的 邮件服务器,内部使用的是 nodemailer
        // 协议://账号:授权码@SMTP服务器
        transport: 'smtps://xx12137@qq.com:abwbidcgxvkzjcfd@smtp.qq.com', //邮件配置信息
        defaults: {
          from: '"akin" <modules@nestjs.com>',//默认邮件头信息
        },
        template: { //配置邮件模板引擎（HTML 模版）
          dir: join(__dirname, '..', 'email/templates'), //使用模版
          adapter: new HandlebarsAdapter(), //适配器
          options: {
            strict: true, //使用严格模式
          },
        },
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],

})
export class EmailModule {
}
