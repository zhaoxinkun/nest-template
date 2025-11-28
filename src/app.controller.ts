import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 导入内置的log
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    // 使用内置的log
    this.logger.warn('getHello() is called');
    return this.appService.getHello();
  }
}
