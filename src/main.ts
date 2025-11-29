import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllExceptionFilter } from './common/filters/all-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // bufferLogs: true,
  });

  // 全局替换使用winston日志
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // 使用configService服务获取配置
  const configService = app.get(ConfigService);

  // 获取port配置
  const port = configService.get<number>('PORT', 3000);
  console.log('🚀 ~ bootstrap ~ port: ', port);

  // 获取ERROR_FILTER配置
  const errorFilter = configService.get<boolean>('ERROR_FILTER', true);
  if (errorFilter) {
    // 使用唯一的全局异常过滤器
    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  }

  // 获取CORS配置
  const cors = configService.get<boolean>('CORS', true);
  if (cors) {
    // 开启CORS
    app.enableCors();
  }

  await app.listen(port);
}

bootstrap();
