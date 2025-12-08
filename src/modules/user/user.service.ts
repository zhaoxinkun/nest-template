import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDao } from '@/modules/user/dao/user.dao';

@Injectable()
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
