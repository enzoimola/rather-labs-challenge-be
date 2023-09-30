import { Injectable } from '@nestjs/common';
import { MediaService } from './app/media/media.service';
import { IMedia } from './models/interfaces/media.interface';
import { IDetailMedia } from './models/interfaces/detailMedia.interface';
import { FavMedia } from './app/media/entities/fav-media.entity';
import { CreateUserInput } from './app/user/dto/create-user.input';
import { ICreateUserResponse } from './models/interfaces/user/createUserResponse.interface';
import { UserService } from './app/user/user.service';
import { IResponse } from './models/interfaces/IResponse.interface';
import { DetailMedia } from './app/media/entities/detailMedia.entity';

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

  async findAll(): Promise<Array<IMedia>> {
    return await this.mediaService.fetchMedia();
  }

  async findSearch(search: string): Promise<Array<IMedia>> {
    return await this.mediaService.findSearch(search);
  }

  async findById(id: number, isMovie: boolean): Promise<DetailMedia> {
    return await this.mediaService.fetchFindBy(id, isMovie);
  }

  async saveFavMedia(media: FavMedia): Promise<void> {
    return await this.mediaService.addFavoriteMedia(media);
  }

  async getFavorites(uid: string): Promise<any> {
    return await this.mediaService.getFavorites(uid);
  }
}
