import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logConfig/MyLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: new MyLogger(),
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
