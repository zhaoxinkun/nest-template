/*
 * 这里是封装的是winston的transport模块的函数
 *
 * 创建每日日志文件传输
 * @param level 日志级别
 * @param filename 文件名
 * @returns 每日日志文件传输
 */
import DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';
import { utilities } from 'nest-winston';


// 控制台日志传输
export const consoleTransport = new winston.transports.Console({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.ms(), //毫秒数
    utilities.format.nestLike(), //这里指定日志前缀
  ),
});

// 每日日志文件传输
export function createDailyRotateTransport(level: string, filename: string) {
  return new DailyRotateFile({
    level,
    filename: `logs/${level}-${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
  });
}
