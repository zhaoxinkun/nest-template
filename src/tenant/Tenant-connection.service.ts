import { Injectable, Scope } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TenantService } from '@/tenant/Tenant.service';

// 注入作用域
@Injectable({ scope: Scope.REQUEST })
export class TenantConnectionService {
  constructor(
    private readonly tenantService: TenantService, //读取租户id
    @InjectDataSource('tenant_3306')
    private readonly tenant3306: DataSource,
    @InjectDataSource('tenant_3307')
    private readonly tenant3307: DataSource,
  ) {
  }

  getDataSource() {
    // 获取不同的租户的id
    const tenantId = this.tenantService.getTenantId();

    // 根据租户id获取不同的数据源
    switch (tenantId) {
      case '3306':
        return this.tenant3306;
      case '3307':
        return this.tenant3307;
      default:
        throw new Error(`Unknown tenant id: ${tenantId}`);
    }
  }

  // 获取不同的租户的repository
  getRepository(entity) {
    return this.getDataSource().getRepository(entity);
  }
}