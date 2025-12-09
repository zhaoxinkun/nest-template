import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TypeormController } from './typeorm.controller';

@Global()
@Module({
  imports: [
    // 默认租户
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/../../modules/**/*.entity.js'],
        autoLoadEntities: false,
        logging: Boolean(configService.get('DB_LOGGING')),
        synchronize: Boolean(configService.get('DB_SYNCHRONIZE')),
      }),
      inject: [ConfigService],
    } as TypeOrmModuleOptions),
    // 3306租户
    TypeOrmModule.forRootAsync(<TypeOrmModuleAsyncOptions>{
      name: 'tenant_3306',
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/../../modules/**/*.entity.js'],
        autoLoadEntities: false,
        logging: Boolean(configService.get('DB_LOGGING')),
        synchronize: Boolean(configService.get('DB_SYNCHRONIZE')),
      }),
      inject: [ConfigService],
    } as TypeOrmModuleOptions),

    // 3307租户
    TypeOrmModule.forRootAsync(<TypeOrmModuleAsyncOptions>{
      name: 'tenant_3307',
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: 3307,
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/../../modules/**/*.entity.js'],
        autoLoadEntities: false,
        logging: Boolean(configService.get('DB_LOGGING')),
        synchronize: Boolean(configService.get('DB_SYNCHRONIZE')),
      }),
      inject: [ConfigService],
    } as TypeOrmModuleOptions),
  ],
  exports: [TypeOrmModule],
  controllers: [TypeormController],
})
export class TypeormModule {
}
