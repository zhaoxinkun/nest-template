/*
*
* 这里是封装的使用@nestjs/config模块的配置模块
*
*  使用Joi进行环境变量校验
*  使用cross-env设置环境变量
*  使用validationSchema对环境变量进行校验
* */

import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule as Config } from '@nestjs/config';

// env文件路径读取
const envFilePath = [`.env.${process.env.NODE_ENV || 'development.env'}`, '.env'];

// 简单的校验
const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  DB_PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
});

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      envFilePath,
      validationSchema: schema,
    }),
  ],
})
export class ConfigModule {
}
