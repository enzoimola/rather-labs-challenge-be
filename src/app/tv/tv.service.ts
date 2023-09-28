import { Injectable } from '@nestjs/common';

import { TvRepository } from './tv.repository';
import { TvDbResponseResult } from '../../models/types/tv-db-response/TvDbResponseResult.type';
import { IMedia } from '../../models/interfaces/media.interface';
import { TvDetailDbResponse } from '../../models/types/tv-db-response/TvDetailDbResponse';
import { MovieDetailDbResponse } from '../../models/types/movie-db-response/MovieDetailDbResponse';
import { IDetailMedia } from '../../models/interfaces/detailMedia.interface';

@Injectable()
export class TvService {
  constructor(private readonly tvRepository: TvRepository) {}

  async findAll(): Promise<Array<IMedia>> {
    const results: Array<TvDbResponseResult> =
      await this.tvRepository.findAll();

    return this.tvDbResultToIMediaParser(results);
  }

  tvDbResultToIMediaParser(results: Array<TvDbResponseResult>): Array<IMedia> {
    return results.map((r: TvDbResponseResult) => ({
      id: r.id,
      name: r.original_name || r.name,
      posterPath: r.poster_path,
      releaseDate: r.release_date,
      voteAverage: r.vote_average,
      isMovie: false,
    }));
  }

  async findById(id: number): Promise<IDetailMedia> {
    const result: TvDetailDbResponse = await this.tvRepository.findById(id);
    return this.tvDetailDbResultToMediaParser(result);
  }

  tvDetailDbResultToMediaParser(result: TvDetailDbResponse): IDetailMedia {
    const {
      id,
      original_name,
      name,
      poster_path,
      first_air_date,
      vote_average,
      overview,
      tagline,
      homepage,
    } = result;

    return {
      id,
      name: name || original_name,
      posterPath: poster_path,
      releaseDate: first_air_date,
      voteAverage: vote_average,
      overview,
      tagline,
      homepage,
    };
  }
}
