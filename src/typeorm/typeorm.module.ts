import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TypeormController } from './typeorm.controller';
import { User } from '@/modules/user/entities/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/../modules/**/*.entity.js'],
        autoLoadEntities: false,
        logging: Boolean(configService.get('DB_LOGGING')),
        synchronize: Boolean(configService.get('DB_SYNCHRONIZE')),
      }),
      inject: [ConfigService],
    } as TypeOrmModuleOptions),
  ],
  controllers: [TypeormController],
})
export class TypeormModule {
}
