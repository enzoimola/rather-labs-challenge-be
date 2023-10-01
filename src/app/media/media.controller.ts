import { Body, Controller, Get, Post } from '@nestjs/common';
import { MediaService } from './media.service';
import { FavMedia } from './dto/create-media.input';

@Controller('media-fav')
export class MediaFavController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('favorite')
  async addFavoriteMovie(@Body() mediaFav: FavMedia): Promise<void> {
    await this.mediaService.addFavoriteMedia(mediaFav);
  }
}
