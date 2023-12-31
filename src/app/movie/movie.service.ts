import { Injectable } from '@nestjs/common';
import { MovieDbResponseResult } from '../../models/types/movie-db-response/movie-db-response-result.type';
import { MovieRepository } from './movie.repository';
import { MovieDetailDbResponse } from '../../models/types/movie-db-response/movie-detail-db-response';
import { DetailMedia } from '../media/entities/detail-media.entity';
import { Media } from '../media/entities/media.entity';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async findAll(): Promise<Array<Media>> {
    const results: Array<MovieDbResponseResult> =
      await this.movieRepository.findAll();
    return this.movieDbResultToMediaParser(results);
  }

  movieDbResultToMediaParser(
    results: Array<MovieDbResponseResult>,
  ): Array<Media> {
    return results.map((r: MovieDbResponseResult) => ({
      id: r.id,
      name: r.original_title || r.title,
      posterPath: r.poster_path ? r.poster_path.split('/')[1] : r.poster_path,
      releaseDate: r.release_date,
      voteAverage: r.vote_average,
      isMovie: true,
    }));
  }

  async findById(id: number): Promise<DetailMedia> {
    const result: MovieDetailDbResponse =
      await this.movieRepository.findById(id);
    return this.movieDetailDbResultToMediaParser(result);
  }

  movieDetailDbResultToMediaParser(result: MovieDetailDbResponse): DetailMedia {
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
      credits,
    } = result;

    const { cast } = credits;

    const actors = cast.map((actor) => ({
      id: actor.credit_id,
      name: actor.name,
      character: actor.character,
      knowForDepartment: actor.known_for_department,
      popularity: actor.popularity,
      profilePath: actor.profile_path,
    }));

    return {
      id,
      name: title || original_title,
      posterPath: poster_path,
      releaseDate: release_date,
      voteAverage: vote_average,
      overview,
      tagline,
      homepage,
      actors,
    };
  }
}
