import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// 判断 .env, .env.development, .env.production 是否存在,再用 dotenv.parse() 手动解析它，不使用 dotenv.config()
export function getEnv(env: string): Record<string, unknown> | undefined {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  }
}

// 它合并两个 env 文件
export function buildConnectionOptions() {
  const defaultConfig = getEnv('.env');
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || 'development'}`);
  const connectionOptions = {
    ...defaultConfig,
    ...envConfig,
  };
  const config = { ...defaultConfig, ...envConfig };
  console.log('config is ', config);


  return {
    type: connectionOptions['DB_TYPE'],
    host: connectionOptions['DB_HOST'],
    port: Number(connectionOptions['DB_PORT']),
    username: connectionOptions['DB_USERNAME'],
    password: connectionOptions['DB_PASSWORD'],
    database: connectionOptions['DB_DATABASE'],
    entities: [__dirname + '/../modules/**/*.entity.js'],
    synchronize: Boolean(connectionOptions['DB_SYNCHRONIZE']),
    autoLoadEntities: Boolean(connectionOptions['DB_AUTO_LOAD_ENTITIES']),
  } as TypeOrmModuleOptions;
}

export default new DataSource({
  ...buildConnectionOptions(),
} as DataSourceOptions);