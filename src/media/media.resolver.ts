import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';
import { IMedia } from '../models/interfaces/media.interface';
import { DetailMedia } from './entities/detailMedia.entity';
import { IDetailMedia } from '../models/interfaces/detailMedia.interface';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Query(() => [Media])
  async media(): Promise<Array<IMedia>> {
    const resp = await this.mediaService.fetchMedia();
    return resp;
  }

  @Query(() => DetailMedia)
  async detailMedia(): Promise<IDetailMedia> {
    const resp = await this.mediaService.fetchFindBy(215103, false);
    return resp;
  }

  // @Mutation(() => Media)
  // createMedia(@Args('createMediaInput') createMediaInput: CreateMediaInput) {
  //   return this.mediaService.create(createMediaInput);
  // }
  //
  // @Query(() => [Media], { name: 'media' })
  // findAll() {
  //   return this.mediaService.findAll();
  // }
  //
  // @Query(() => Media, { name: 'media' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.mediaService.findOne(id);
  // }
  //
  // @Mutation(() => Media)
  // updateMedia(@Args('updateMediaInput') updateMediaInput: UpdateMediaInput) {
  //   return this.mediaService.update(updateMediaInput.id, updateMediaInput);
  // }
  //
  // @Mutation(() => Media)
  // removeMedia(@Args('id', { type: () => Int }) id: number) {
  //   return this.mediaService.remove(id);
  // }
}
