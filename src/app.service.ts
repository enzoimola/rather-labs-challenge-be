import { Injectable } from '@nestjs/common';
import { MediaService } from './app/media/media.service';
import { CreateUserInput } from './app/user/dto/create-user.input';
import { ICreateUserResponse } from './models/interfaces/user/create-user-response.interface';
import { UserService } from './app/user/user.service';
import { DetailMedia } from './app/media/entities/detail-media.entity';
import { FavMedia } from './app/media/dto/create-media.input';
import { Media } from './app/media/entities/media.entity';
import { IAddFavMediaResponse } from './models/interfaces/media/add-fav-media-response.interface';

@Injectable()
export class AppService {
  constructor(
    private readonly mediaService: MediaService,
    private readonly userService: UserService,
  ) {}

  async createUser(input: CreateUserInput): Promise<ICreateUserResponse> {
    return await this.userService.create(input);
  }

  async getUser(userId: string): Promise<any> {
    return await this.userService.getUser(userId);
  }

  async findAll(): Promise<Array<Media>> {
    return await this.mediaService.fetchMedia();
  }

  async findById(id: number, isMovie: boolean): Promise<DetailMedia> {
    return await this.mediaService.fetchFindBy(id, isMovie);
  }

  async saveFavMedia(media: FavMedia): Promise<IAddFavMediaResponse> {
    return await this.mediaService.addFavoriteMedia(media);
  }

  async getFavorites(uid: string): Promise<any> {
    return await this.mediaService.getFavorites(uid);
  }
}
