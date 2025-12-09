import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { UserDao } from '@/modules/user/dao/user.dao';
import { TenantConnectionService } from '@/database/tenant/tenant.connection.service';
import { TenantModule } from '@/database/tenant/tenant.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TenantModule],
  controllers: [UserController],
  providers: [UserService, UserDao, TenantConnectionService],
})
export class UserModule {
}
