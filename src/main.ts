import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupApp } from '@/setup';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // bufferLogs: true,
  });

  setupApp(app);

  // 使用configService服务获取配置
  const configService = app.get(ConfigService);

  // 获取port配置
  const port = configService.get<number>('PORT', 3000);
  console.log('🚀 ~ bootstrap ~ port: ', port);


  await app.listen(port);
}

bootstrap();
