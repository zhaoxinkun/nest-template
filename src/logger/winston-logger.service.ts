// src/logger/winston-logger.service.ts
import { LoggerService, Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';

@Injectable()
export class WinstonLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      // level: 'debug', // 你也可以改成 info、warn 等
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}] ${message}`;
        }),
      ),
      transports: [
        // 控制台输出（带颜色）
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),

        // 日志写入文件（可选）
        new winston.transports.File({
          filename: path.join(__dirname, '../../logs/combined.log'),
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(context ? `[${context}] ${message}` : message);
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(
      context ? `[${context}] ${message} \n${trace || ''}` : `${message} \n${trace || ''}`,
    );
  }

  warn(message: string, context?: string) {
    this.logger.warn(context ? `[${context}] ${message}` : message);
  }

  debug(message: string, context?: string) {
    this.logger.debug(context ? `[${context}] ${message}` : message);
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(context ? `[${context}] ${message}` : message);
  }
}