import { Injectable } from '@nestjs/common';
import { MovieService } from '../movie/movie.service';
import { TvService } from '../tv/tv.service';
import { MediaRepository } from './media.repository';
import { DetailMedia } from './entities/detail-media.entity';
import { IAddFavMediaResponse } from '../../models/interfaces/media/add-fav-media-response.interface';
import { FavMedia } from './dto/create-media.input';
import { Media } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    private readonly movieService: MovieService,
    private readonly tvService: TvService,
    private readonly mediaRepository: MediaRepository,
  ) {}

  async fetchMedia(): Promise<Array<Media>> {
    const movieData = await this.movieService.findAll();
    const tvData = await this.tvService.findAll();
    const [movies, tvs] = await Promise.all([movieData, tvData]);

    return [...movies, ...tvs];
  }

  async fetchFindBy(id: number, isMovie: boolean): Promise<DetailMedia> {
    const data = isMovie
      ? await this.movieService.findById(id)
      : await this.tvService.findById(id);

    return data;
  }

  async addFavoriteMedia(media: FavMedia): Promise<IAddFavMediaResponse> {
    return await this.mediaRepository.addFavMedia(media);
  }

  async getFavorites(uid: string): Promise<Array<Partial<Media>>> {
    return await this.mediaRepository.getFavorites(uid);
  }
}
