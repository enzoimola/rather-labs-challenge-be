import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IMedia } from './models/interfaces/media/media.interface';
import { CreateUserInput } from './app/user/dto/create-user.input';
import { ICreateUserResponse } from './models/interfaces/user/create-user-response.interface';
import { DetailMedia } from './app/media/entities/detail-media.entity';
import { FavMedia } from './app/media/dto/create-media.input';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create-user')
  async createUser(
    @Body() input: CreateUserInput,
  ): Promise<ICreateUserResponse> {
    return await this.appService.createUser(input);
  }

  @Get('/user/:uid')
  async getUser(@Param('uid') uid: string): Promise<any> {
    return await this.appService.getUser(uid);
  }

  @Get()
  getHello(): Promise<Array<IMedia>> {
    return this.appService.findAll();
  }

  @Get('/search')
  getMediaSearch(): Promise<Array<IMedia>> {
    return this.appService.findSearch('batman');
  }

  @Get('/findById/:id/:isMovie')
  getById(
    @Param('id') id: number,
    @Param('isMovie') isMovie: boolean,
  ): Promise<DetailMedia> {
    return this.appService.findById(id, isMovie);
  }

  @Post('add-favorite')
  async addFavoriteMovie(@Body() mediaFav: FavMedia): Promise<void> {
    await this.appService.saveFavMedia(mediaFav);
  }

  @Get('/user/:uid/fav')
  async getFavorites(@Param('uid') uid: string): Promise<any> {
    await this.appService.getFavorites(uid);
  }
}
