import { Injectable, Scope } from '@nestjs/common';
import { User } from '@/modules/user/entities/user.entity';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { TenantConnectionService } from '@/database/tenant/tenant.connection.service';

@Injectable({ scope: Scope.REQUEST })
export class UserDao {
  constructor(
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
