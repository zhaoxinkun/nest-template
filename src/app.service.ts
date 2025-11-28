import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {
  }

  getHello(): string {
    const dbPort = this.configService.get('DB_TYPE');
    return `Hello World! DB Port: ${dbPort}`;
  }
}
