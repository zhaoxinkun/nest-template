import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class TenantService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
  ) {
  }

  // 租户解析器
  getTenantId() {
    return this.request.headers['x-tenant-id'];
  }
}