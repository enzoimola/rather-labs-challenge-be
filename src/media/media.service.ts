import { Injectable } from '@nestjs/common';
import { MovieService } from '../app/movie/movie.service';
import { TvService } from '../app/tv/tv.service';
import { IMedia } from '../models/interfaces/media.interface';
import { MediaRepository } from './media.repository';
import { MovieDbResponseResult } from '../models/types/movie-db-response/MovieDbResponseResult.type';
import { MediaDbResponseResult } from '../models/types/media-db-response/MediaDbResponseResult.type';

@Injectable()
export class MediaService {
  constructor(
    private readonly movieService: MovieService,
    private readonly tvService: TvService,
    private readonly mediaRepository: MediaRepository,
  ) {}

  async fetchMedia(): Promise<IMedia> {
    const movieData = await this.movieService.findAll();
    const tvData = await this.tvService.findAll();
    const [movies, tvs] = await Promise.all([movieData, tvData]);

    return {
      result: [...movies.result, ...tvs.result],
    };
  }

  async findSearch(search: string) {
    const results: Array<MovieDbResponseResult> =
      await this.mediaRepository.findSearch(search);
    return this.mediaDbResultToMediaParser(results);
  }

  mediaDbResultToMediaParser(results: Array<MediaDbResponseResult>): IMedia {
    return {
      result: results.map((r: MediaDbResponseResult) => ({
        id: r.id,
        name: r.original_title || r.title || r.name || r.original_name,
      })),
    };
  }
}
