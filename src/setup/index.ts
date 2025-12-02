import { INestApplication } from '@nestjs/common';
import { setupLogger } from '@/setup/setup-logger';
import { setupFilter } from '@/setup/setup-filter';
import { setupCors } from '@/setup/setup-cors';

export function setupApp(app: INestApplication) {
  // 全局替换使用winston日志
  setupLogger(app);

  // 使用唯一的全局异常过滤器
  setupFilter(app);

  // 开启CORS
  setupCors(app);
}
