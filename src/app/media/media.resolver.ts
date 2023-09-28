import { Resolver, Query, Args } from '@nestjs/graphql';
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';
import { IMedia } from '../../models/interfaces/media.interface';
import { DetailMedia } from './entities/detailMedia.entity';
import { IDetailMedia } from '../../models/interfaces/detailMedia.interface';
import { FavMedia } from './entities/fav-media.entity';
import { GetUrlMedia } from './entities/getUrlMedia.entity';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Query(() => [Media])
  async media(): Promise<Array<IMedia>> {
    const resp = await this.mediaService.fetchMedia();
    return resp;
  }

  @Query(() => DetailMedia)
  async detailMedia(
    @Args('id', { type: () => Number }) id: number,
    @Args('isMovie', { type: () => Boolean }) isMovie: boolean,
  ): Promise<IDetailMedia> {
    const resp = await this.mediaService.fetchFindBy(id, isMovie);
    return resp;
  }

  @Query(() => [FavMedia])
  async getFavorites(): Promise<{ markAsFav: boolean; id: number }[]> {
    const resp = await this.mediaService.getFavorites();
    return resp;
  }

  @Query(() => [GetUrlMedia])
  async getURLMedia() {
    return this.mediaService.getURLMedia();
  }
}
