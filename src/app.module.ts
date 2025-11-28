import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: true,
        transport: {
          targets: [
            {
              // 配置格式化
              target: 'pino-pretty',
              options: {
                colorize: true,
              },
            },
            {
              // 配置滚动输出
              target: 'pino-roll',
              options: {
                mkdir: true,              // 自动创建日志目录
                file: './logs/app.log',   // 必须指定文件路径
                interval: '1d',           // 每天滚动
                maxFiles: 7,              // 保留最近 7 个日志文件
                colorize: true,          // 文件里不需要彩色
              },
            },
          ],
        },

      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
