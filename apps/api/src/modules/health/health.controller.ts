import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      service: 'edumanager-api',
      timestamp: new Date().toISOString(),
    };
  }
}
