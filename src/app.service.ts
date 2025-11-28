import { Injectable } from '@nestjs/common';
import config from 'config';

@Injectable()
export class AppService {
  getHello(): string {
    const dbPort = config.get('Customer.dbConfig.port');
    // const apiKey = config.get('thirdparty.apiKey');
    // const endpoint = config.get('thirdparty.endpoint');
    return `Hello World! DB Port: ${dbPort}`;
  }
}
