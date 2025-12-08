import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { UserDao } from '@/modules/user/dao/user.dao';


@Module({
  imports: [
    // 注入不同数据库的实体
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([User], 'mysql1')],
  controllers: [UserController],
  providers: [UserService, UserDao],
})
export class UserModule {
}
