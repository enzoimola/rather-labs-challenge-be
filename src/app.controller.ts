import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IMedia } from './models/interfaces/media.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<IMedia> {
    return this.appService.findAll();
  }

  @Get('/search')
  getMediaSearch(): Promise<IMedia> {
    return this.appService.findSearch('batman');
  }
}
