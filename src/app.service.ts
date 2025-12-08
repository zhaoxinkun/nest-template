import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class AppService {
  constructor(
    @Inject(REQUEST) private request: Request,
  ) {
  }

  // 偏方配置port
  getDBPort() {
    const headers = this.request.headers;
    const tenantId = headers['x-tenant-id'] as string;
    if (tenantId === 'mysql1') {
      return 3307;
    } else {
      return 3306;
    }
  }
}