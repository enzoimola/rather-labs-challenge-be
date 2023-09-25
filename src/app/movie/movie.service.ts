import { Injectable } from '@nestjs/common';
import { MovieDbResponseResult } from '../../models/types/movie-db-response/MovieDbResponseResult.type';
import { MovieRepository } from './movie.repository';
import { Media } from '../../media/entities/media.entity';
import { IMedia } from '../../models/interfaces/media.interface';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async findAll(): Promise<IMedia> {
    const results: Array<MovieDbResponseResult> =
      await this.movieRepository.findAll();
    return this.movieDbResultToMediaParser(results);
  }

  movieDbResultToMediaParser(results: Array<MovieDbResponseResult>): IMedia {
    return {
      result: results.map((r: MovieDbResponseResult) => ({
        id: r.id,
        name: r.original_title || r.title,
      })),
    };
  }
}
