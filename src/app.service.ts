import { Injectable } from '@nestjs/common';
import process from 'process';

@Injectable()
export class AppService {
  getHello(): string {
    // 获取env数据
    const port = process.env.MYSQL_PORT ?? 3000;
    return `Hello World! Port: ${port}`;
  }
}
