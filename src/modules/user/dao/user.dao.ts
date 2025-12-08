import { User } from '@/modules/user/entities/user.entity';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { Injectable, Scope } from '@nestjs/common';
import { TenantConnectionService } from '@/tenant/Tenant-connection.service';

@Injectable({ scope: Scope.REQUEST })
export class UserDao {
  constructor(
    // 获取多租户
    private readonly tenantConn: TenantConnectionService,
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    const repo = this.tenantConn.getRepository(User);
    const user = repo.create(createUserDto);
    return repo.save(user);
  }

  async findAll() {
    return this.tenantConn.getRepository(User).find();
  }
}
