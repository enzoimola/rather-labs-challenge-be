import { Injectable } from '@nestjs/common';
import { MediaService } from './media/media.service';
import { IMedia } from './models/interfaces/media.interface';
import { IDetailMedia } from './models/interfaces/detailMedia.interface';

@Injectable()
export class AppService {
  constructor(private readonly mediaService: MediaService) {}

  async findAll(): Promise<Array<IMedia>> {
    return await this.mediaService.fetchMedia();
  }

  async findSearch(search: string): Promise<Array<IMedia>> {
    return await this.mediaService.findSearch(search);
  }

  async findById(id: number, isMovie: boolean): Promise<IDetailMedia> {
    return await this.mediaService.fetchFindBy(id, isMovie);
  }
}
