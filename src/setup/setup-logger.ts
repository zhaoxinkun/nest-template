import { INestApplication } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

export function setupLogger(app: INestApplication) {
  // 全局替换使用winston日志
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
}