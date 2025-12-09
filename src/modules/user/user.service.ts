import { Injectable, Scope } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDao } from '@/modules/user/dao/user.dao';

@Injectable({ scope: Scope.REQUEST })
export class UserService {

  constructor(
    private readonly userDao: UserDao,
  ) {

  }

  create(createUserDto: CreateUserDto) {
    return this.userDao.create(createUserDto);
  }

  findAll() {
    return this.userDao.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
