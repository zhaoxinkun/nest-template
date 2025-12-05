import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/database/prisma/prisma.service';
import { UserRepository } from '@/modules/user/user.repository';

@Injectable()
export class UserService {

  constructor(
    private readonly userR: UserRepository,
  ) {
  }

  create(createUserDto: CreateUserDto) {
    return this.userR.create(createUserDto);
  }

  findAll() {
    return this.userR.findAll();
  }

  findOne(id: number) {
    return this.userR.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
