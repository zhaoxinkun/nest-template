import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('typeorm')
export class TypeormController {
  constructor(private readonly dataSource: DataSource) {
  }

  @Get('db')
  async checkDb() {
    try {
      await this.dataSource.query('SELECT 1');
      return { status: 'ok', db: 'connected' };
    } catch (e) {
      return { status: 'error', db: 'disconnected', error: e.message };
    }
  }

}
