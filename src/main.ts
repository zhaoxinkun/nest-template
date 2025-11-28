import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as winston from 'winston';
// import { utilities, WinstonModule } from 'nest-winston';
import { WinstonLogger } from './logger/winston-logger.service';

// const WinstonLogger = WinstonModule.createLogger({
//   // 重新配置
//   transports: [
//     // 新的console
//     new winston.transports.Console({
//       level: 'info',
//       // 格式
//       format: winston.format.combine(
//         winston.format.timestamp(),
//         utilities.format.nestLike(),
//       ),
//     }),
//   ],
// });


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: WinstonLogger,
    logger: new WinstonLogger(),
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
