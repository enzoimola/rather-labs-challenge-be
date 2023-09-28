import { Injectable } from '@nestjs/common';
import { MovieDbResponseResult } from '../../models/types/movie-db-response/MovieDbResponseResult.type';
import { MovieRepository } from './movie.repository';
import { IMedia } from '../../models/interfaces/media.interface';
import { IDetailMedia } from '../../models/interfaces/detailMedia.interface';
import { MovieDetailDbResponse } from '../../models/types/movie-db-response/MovieDetailDbResponse';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async findAll(): Promise<Array<IMedia>> {
    const results: Array<MovieDbResponseResult> =
      await this.movieRepository.findAll();
    return this.movieDbResultToMediaParser(results);
  }

  movieDbResultToMediaParser(
    results: Array<MovieDbResponseResult>,
  ): Array<IMedia> {
    return results.map((r: MovieDbResponseResult) => ({
      id: r.id,
      name: r.original_title || r.title,
      posterPath: r.poster_path,
      releaseDate: r.release_date,
      voteAverage: r.vote_average,
      isMovie: true,
    }));
  }

  async findById(id: number): Promise<IDetailMedia> {
    const result: MovieDetailDbResponse =
      await this.movieRepository.findById(id);
    return this.movieDetailDbResultToMediaParser(result);
  }

  movieDetailDbResultToMediaParser(
    result: MovieDetailDbResponse,
  ): IDetailMedia {
    const {
      id,
      original_title,
      title,
      poster_path,
      release_date,
      vote_average,
      overview,
      tagline,
      homepage,
    } = result;

    return {
      id,
      name: title || original_title,
      posterPath: poster_path,
      releaseDate: release_date,
      voteAverage: vote_average,
      overview,
      tagline,
      homepage,
    };
  }
}
