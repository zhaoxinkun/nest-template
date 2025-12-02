import { Controller, Get } from '@nestjs/common';
import { CacheService } from '@/cache/cache.service';


@Controller()
export class AppController {
  constructor(
    private cache: CacheService,
  ) {

  }

  @Get()
  getHello(): string {
    return 'Hello World!';
  }


  @Get('cache')
  async testCache() {
    const data = await this.cache.getOrSet(
      'user:list',
      5000,
      async () => {
        console.log('查询数据库...');
        return [{ id: 1, name: 'Jack' }];
      },
    );

    return data;
  }

}
