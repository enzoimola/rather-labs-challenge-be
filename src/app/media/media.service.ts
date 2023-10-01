import { Injectable } from '@nestjs/common';
import { MovieService } from '../movie/movie.service';
import { TvService } from '../tv/tv.service';
import { IMedia } from '../../models/interfaces/media/media.interface';
import { MediaRepository } from './media.repository';
import { MovieDbResponseResult } from '../../models/types/movie-db-response/movie-db-response-result.type';
import { MediaDbResponseResult } from '../../models/types/media-db-response/media-db-response-result.type';
import { DetailMedia } from './entities/detail-media.entity';
import { IResponseFavMedia } from '../../models/interfaces/media/response-fav-media.interface';
import { FavMedia } from './dto/create-media.input';

@Injectable()
export class MediaService {
  constructor(
    private readonly movieService: MovieService,
    private readonly tvService: TvService,
    private readonly mediaRepository: MediaRepository,
  ) {}

  async fetchMedia(): Promise<Array<IMedia>> {
    const movieData = await this.movieService.findAll();
    const tvData = await this.tvService.findAll();
    const [movies, tvs] = await Promise.all([movieData, tvData]);

    return [...movies, ...tvs];
  }

  async findSearch(search: string) {
    const results: Array<MovieDbResponseResult> =
      await this.mediaRepository.findSearch(search);
    const result = this.mediaDbResultToMediaParser(results);
    debugger;
    return result;
  }

  mediaDbResultToMediaParser(
    results: Array<MediaDbResponseResult>,
  ): Array<IMedia> {
    const result = results.map((r: MediaDbResponseResult) => ({
      id: r.id,
      name: r.original_title || r.title || r.name || r.original_name,
      posterPath: r.poster_path,
      releaseDate: r.release_date,
      voteAverage: r.vote_average,
      isMovie: null,
    }));
    return result;
  }

  async fetchFindBy(id: number, isMovie: boolean): Promise<DetailMedia> {
    const data = isMovie
      ? await this.movieService.findById(id)
      : await this.tvService.findById(id);

    return data;
  }

  async addFavoriteMedia(media: FavMedia): Promise<IResponseFavMedia> {
    return await this.mediaRepository.saveFavMedia(media);
  }

  async getFavorites(uid: string): Promise<any> {
    return await this.mediaRepository.getFavorites(uid);
  }

  async getURLMedia(): Promise<{ id: string; homepage: unknown }[]> {
    return await this.mediaRepository.getURLMedia();
  }
}
