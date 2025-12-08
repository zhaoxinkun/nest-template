import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

export class UserDao {
  constructor(@InjectRepository(User) private readonly userRep: Repository<User>) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRep.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRep.find();
  }
}
