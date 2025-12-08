import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

export class UserDao {
  constructor(
    // 这里是我操作不同的数据库实体,给一个name即可
    @InjectRepository(User) private readonly userRep: Repository<User>,
    @InjectRepository(User, 'mysql1') private readonly userRep1: Repository<User>) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRep.save(createUserDto);
  }

  async findAll(): Promise<{ userList: User[]; userList2: User[] }> {
    const userList = await this.userRep.find();
    const userList2 = await this.userRep1.find();
    return {
      userList,
      userList2,
    };
  }
}
