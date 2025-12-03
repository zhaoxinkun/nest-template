import { Controller, Get, Post } from '@nestjs/common';
import { CacheService } from '@/common/cache/cache.service';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailService } from '@/common/email/email.service';


@Controller()
export class AppController {
  constructor(
    private cache: CacheService,
    private readonly emailService: EmailService,
  ) {

  }

  @Get()
  getHello(): string {
    return 'Hello World!';
  }


  @Get('cache')
  async testCache() {
    const data = await this.cache.getOrSet(
      'user:list',
      5000,
      async () => {
        console.log('查询数据库...');
        return [{ id: 1, name: 'Jack' }];
      },
    );

    return data;
  }

  @Get('email')
  async testEmail() {
    return await this.emailService.send();
  }

}
