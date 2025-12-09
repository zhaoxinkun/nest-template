import { Module } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';

@Module({})
export class PrismaModule {
  static forRoot() {
    return {
      module: PrismaModule,
      providers: [PrismaService],
      exports: [PrismaService],
    };
  }
}
