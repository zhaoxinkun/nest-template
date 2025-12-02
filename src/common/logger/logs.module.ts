/*
 * 这里是封装的winston日志模块
 *
 *  使用winston模块进行日志记录
 *  使用nest-winston模块进行nestjs集成
 *  使用createRotateTransport函数创建每日日志文件传输
 * */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { consoleTransport, createDailyRotateTransport } from './createRotateTransport';

// 这里就是导入配置winston日志的,详细的transports在另一个文件里
@Module({
  imports: [
    // 注册Winston
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logOn = configService.get('LOG_ON') === 'true';
        return {
          transports: [
            // 这里的内容在另一个文件里
            consoleTransport,
            ...(logOn
              ? [
                createDailyRotateTransport('info', 'application'),
                createDailyRotateTransport('warn', 'application'),
              ]
              : []),
          ],
        };
      },
    }),
  ],
})
export class LogsModule {
}
