import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';
import { DetailMedia } from './entities/detail-media.entity';
import { FavMedia } from './dto/create-media.input';
import { FavMediaEntity } from './entities/fav-media.entity';
import { IAddFavMediaResponse } from '../../models/interfaces/media/add-fav-media-response.interface';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Query(() => [Media])
  async media(): Promise<Array<Media>> {
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
  ): Promise<Array<Partial<Media>>> {
    const resp = await this.mediaService.getFavorites(uid);
    return resp;
  }

  @Mutation(() => IAddFavMediaResponse)
  async addFavMedia(
    @Args('media') media: FavMedia,
  ): Promise<IAddFavMediaResponse> {
    return await this.mediaService.addFavoriteMedia(media);
  }
}
