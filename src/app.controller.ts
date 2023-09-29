import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IMedia } from './models/interfaces/media.interface';
import { IDetailMedia } from './models/interfaces/detailMedia.interface';
import { FavMedia } from './app/media/entities/fav-media.entity';
import { CreateUserInput } from './app/user/dto/create-user.input';
import { ICreateUserResponse } from './models/interfaces/user/createUserResponse.interface';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create-user')
  async createUser(
    @Body() input: CreateUserInput,
  ): Promise<ICreateUserResponse> {
    return await this.appService.createUser(input);
  }

  @Get(':email')
  async checkUser(@Param() email: string): Promise<ICreateUserResponse> {
    return await this.appService.checkUser(email);
  }

  @Get()
  getHello(): Promise<Array<IMedia>> {
    return this.appService.findAll();
  }

  @Get('/search')
  getMediaSearch(): Promise<Array<IMedia>> {
    return this.appService.findSearch('batman');
  }

  @Get('/findById')
  getById(): Promise<IDetailMedia> {
    return this.appService.findById(215103, true);
  }

  @Post('save')
  async addFavoriteMovie(@Body() mediaFav: FavMedia): Promise<void> {
    await this.appService.saveFavMedia(mediaFav);
  }

  @Get('get-favorites')
  async getFavorites(): Promise<any> {
    await this.appService.getFavorites();
  }
}
