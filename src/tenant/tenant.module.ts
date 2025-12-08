import { Global, Module } from '@nestjs/common';
import { TenantService } from '@/tenant/Tenant.service';
import { TenantConnectionService } from '@/tenant/Tenant-connection.service';
import { TypeormModule } from '@/typeorm/typeorm.module';


@Global()
@Module({
  imports: [TypeormModule],
  controllers: [],
  providers: [TenantService, TenantConnectionService],
  exports: [TenantService, TenantConnectionService],
})
export class TenantModule {
}
