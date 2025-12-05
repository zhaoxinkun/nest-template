import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from '@/modules/user/user.repository';
import { PrismaModule } from '@/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],  // 如果 PrismaService 在 PrismaModule 中
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {
}
