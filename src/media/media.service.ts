import { Injectable } from '@nestjs/common';
import { MovieService } from '../app/movie/movie.service';
import { TvService } from '../app/tv/tv.service';
import { IMedia } from '../models/interfaces/media.interface';
import { MediaRepository } from './media.repository';
import { MovieDbResponseResult } from '../models/types/movie-db-response/MovieDbResponseResult.type';
import { MediaDbResponseResult } from '../models/types/media-db-response/MediaDbResponseResult.type';
import { MovieDetailDbResponse } from '../models/types/movie-db-response/MovieDetailDbResponse';
import { IDetailMedia } from '../models/interfaces/detailMedia.interface';

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
    return this.mediaDbResultToMediaParser(results);
  }

  mediaDbResultToMediaParser(
    results: Array<MediaDbResponseResult>,
  ): Array<IMedia> {
    const result = results.map((r: MediaDbResponseResult) => ({
      id: r.id,
      name: r.original_title || r.title || r.name || r.original_name,
      poster_path: r.poster_path,
      release_date: r.release_date,
      vote_average: r.vote_average,
      isMovie: null,
    }));
    return result;
  }

  async fetchFindBy(id: number, isMovie: boolean): Promise<IDetailMedia> {
    const data = isMovie
      ? await this.movieService.findById(id)
      : await this.tvService.findById(id);

    return data;
  }
}
