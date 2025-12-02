/*
*
* 这里是封装的全局异常过滤器
*  1. 捕获所有异常
*  2. 记录异常信息
*  3. 返回异常信息
* */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as requestIP from 'request-ip';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger();

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {
  }

  catch(exception: T, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg = exception instanceof HttpException ? exception.message : 'Internal server error';

    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      timestamp: Date.now(),
      ip: requestIP.getClientIp(request),
      exception: exception,
      error: msg,
      code: httpStatus,
      data: null,
    };

    this.logger.error(msg, responseBody);
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
