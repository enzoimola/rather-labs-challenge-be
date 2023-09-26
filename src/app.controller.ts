import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IMedia } from './models/interfaces/media.interface';
import { IDetailMedia } from './models/interfaces/detailMedia.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<Array<IMedia>> {
    return this.appService.findAll();
  }

  @Get('/search')
  getMediaSearch(): Promise<Array<IMedia>> {
    return this.appService.findSearch('batman');
  }

  @Get('/findById')
  getById(): Promise<IDetailMedia> {
    return this.appService.findById(215103, true);
  }
}
