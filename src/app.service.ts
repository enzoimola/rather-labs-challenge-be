import { Injectable } from '@nestjs/common';
import { MediaService } from './media/media.service';
import { IMedia } from './models/interfaces/media.interface';

@Injectable()
export class AppService {
  constructor(private readonly mediaService: MediaService) {}

  async findAll(): Promise<IMedia> {
    return await this.mediaService.fetchMedia();
  }

  async findSearch(search: string): Promise<IMedia> {
    return await this.mediaService.findSearch(search);
  }
}
