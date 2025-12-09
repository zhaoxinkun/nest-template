import { Module } from '@nestjs/common';
import { TenantService } from '@/database/tenant/tenant.service';
import { TypeormModule } from '@/database/typeorm/typeorm.module';
import { TenantConnectionService } from '@/database/tenant/tenant.connection.service';

@Module({
  imports: [TypeormModule],
  providers: [TenantService, TenantConnectionService],
  exports: [TenantService, TenantConnectionService],

})
export class TenantModule {
}
