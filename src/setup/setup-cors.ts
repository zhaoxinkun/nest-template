import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function setupCors(app: INestApplication) {
  const configService = app.get(ConfigService);
  // 获取CORS配置
  const cors = configService.get<boolean>('CORS', true);
  if (cors) {
    // 开启CORS
    app.enableCors();
  }
}
