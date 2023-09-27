import { Body, Controller, Post } from '@nestjs/common';
import { FavMedia } from './entities/fav-media.entity';
import { MediaService } from './media.service';

@Controller('media-fav')
export class MediaFavController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('favorite')
  async addFavoriteMovie(@Body() mediaFav: FavMedia): Promise<void> {
    await this.mediaService.addFavoriteMedia(mediaFav);
  }
}
