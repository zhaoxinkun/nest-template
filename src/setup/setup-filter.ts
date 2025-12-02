import { INestApplication } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionFilter } from '@/common/filters/all-exception.filter';
import { ConfigService } from '@nestjs/config';

export function setupFilter(app: INestApplication) {

  const configService = app.get(ConfigService);
  // 获取ERROR_FILTER配置
  const errorFilter = configService.get<boolean>('ERROR_FILTER', true);
  if (errorFilter) {
    // 使用唯一的全局异常过滤器
    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  }
}