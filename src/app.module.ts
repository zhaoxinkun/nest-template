import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LogsModule } from './common/logger/logs.module';
import { CacheModule } from '@/common/cache/cache.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './common/email/email.module';
import { UserModule } from './modules/user/user.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AppService } from '@/app.service';


@Module({
  imports: [
    ConfigModule,
    LogsModule,
    CacheModule,
    RedisModule,
    EmailModule,
    UserModule,
    TypeormModule,
    TypeOrmModule.forRootAsync({
      name: 'mysql1',
      useFactory: (configService: ConfigService, appService: AppService) => {
        console.log('mysql1 port:!!!!1', appService.getDBPort());
        return ({
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: appService.getDBPort(),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/../modules/**/*.entity.js'],
          autoLoadEntities: false,
          logging: Boolean(configService.get('DB_LOGGING')),
          synchronize: Boolean(configService.get('DB_SYNCHRONIZE')),
        });
      },
      extraProviders: [AppService],
      inject: [ConfigService, AppService],
    } as TypeOrmModuleOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
