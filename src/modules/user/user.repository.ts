// src/modules/user/user.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {
  }

  findAll() {
    return this.prisma.user.findMany({
      include: { roles: true },
    });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { roles: true },
    });
  }

  findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      include: { roles: true },
    });
  }

  create(data: any) {
    return this.prisma.user.create({ data });
  }

  addRole(userId: number, roleId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        roles: { connect: { id: roleId } },
      },
    });
  }
}