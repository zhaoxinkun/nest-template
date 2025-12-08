import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class TenantService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
  ) {
  }

  // 获取租户信息
  getTenantId(): string {
    const headers = this.request.headers;
    return headers['x-tenant-id'] as string;
  }

}