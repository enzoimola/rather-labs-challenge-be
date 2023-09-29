import { Body, Controller, Get, Post } from '@nestjs/common';
import { FavMedia } from './entities/fav-media.entity';
import { MediaService } from './media.service';

@Controller('media-fav')
export class MediaFavController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('favorite')
  async addFavoriteMovie(@Body() mediaFav: FavMedia): Promise<void> {
    await this.mediaService.addFavoriteMedia(mediaFav);
  }

  // @Get('get-favorites')
  // async getFavorites() {
  //   return await this.mediaService.getFavorites();
  // }
}
