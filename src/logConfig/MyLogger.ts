import { LoggerService } from '@nestjs/common';
import { Logger } from '@nestjs/common';

// 这里是完全重写内置的LoggerService,实现定制化
export class MyLogger implements LoggerService {
  log(message: any, context?: string) {
    console.log('[LOG]', context, message);
  }

  error(message: any, trace?: string, context?: string) {
    console.error('[ERROR]', context, message, trace);
  }

  warn(message: any, context?: string) {
    console.warn('[WARN]', context, message);
  }

  debug(message: any, context?: string) {
    console.debug('[DEBUG]', context, message);
  }

  verbose(message: any, context?: string) {
    console.debug('[VERBOSE]', context, message);
  }
}
