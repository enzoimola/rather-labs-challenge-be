import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';
import { IMedia } from '../../models/interfaces/media/media.interface';
import { DetailMedia } from './entities/detail-media.entity';
import { GetUrlMedia } from './entities/get-url-media.entity';
import { IResponseFavMedia } from '../../models/interfaces/media/response-fav-media.interface';
import { FavMedia } from './dto/create-media.input';
import { FavMediaEntity } from './entities/fav-media.entity';

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
  ): Promise<DetailMedia> {
    const resp = await this.mediaService.fetchFindBy(id, isMovie);
    return resp;
  }

  @Query(() => [FavMediaEntity])
  async getFavorites(
    @Args('uid', { type: () => String }) uid: string,
  ): Promise<any> {
    const resp = await this.mediaService.getFavorites(uid);
    return resp;
  }

  @Query(() => [GetUrlMedia])
  async getURLMedia() {
    return this.mediaService.getURLMedia();
  }

  @Mutation(() => IResponseFavMedia)
  async addFavMedia(
    @Args('media') media: FavMedia,
  ): Promise<IResponseFavMedia> {
    return await this.mediaService.addFavoriteMedia(media);
  }
}
