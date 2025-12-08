import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TypeormController } from './typeorm.controller';
import { TenantService } from '@/modules/user/TenantService';


@Global()
@Module({
  imports: [
    // 第一个租户的数据库连接
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
    // 第二个租户的数据库连接
    // TypeOrmModule.forRootAsync({
    //   name: 'mysql1',
    //   useFactory: (configService: ConfigService, tenantService: TenantService) => {
    //     console.log('mysql1 port:!!!!1', tenantService.getDBPort('mysql1'));
    //     return ({
    //       type: 'mysql',
    //       host: configService.get('DB_HOST'),
    //       port: tenantService.getDBPort('mysql1'),
    //       username: configService.get('DB_USERNAME'),
    //       password: configService.get('DB_PASSWORD'),
    //       database: configService.get('DB_DATABASE'),
    //       entities: [__dirname + '/../modules/**/*.entity.js'],
    //       autoLoadEntities: false,
    //       logging: Boolean(configService.get('DB_LOGGING')),
    //       synchronize: Boolean(configService.get('DB_SYNCHRONIZE')),
    //     });
    //   },
    //   extraProviders: [TenantService],
    //   inject: [ConfigService, TenantService],
    // } as TypeOrmModuleOptions),
  ],
  controllers: [TypeormController],
})
export class TypeormModule {
}
