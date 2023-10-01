import { Injectable } from '@nestjs/common';

import { TvRepository } from './tv.repository';
import { TvDbResponseResult } from '../../models/types/tv-db-response/tv-db-response-result.type';
import { IMedia } from '../../models/interfaces/media/media.interface';
import { TvDetailDbResponse } from '../../models/types/tv-db-response/tv-detail-db-response';
import { DetailMedia } from '../media/entities/detail-media.entity';

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
      posterPath: r.poster_path ? r.poster_path.split('/')[1] : r.poster_path,
      releaseDate: r.first_air_date,
      voteAverage: r.vote_average,
      isMovie: false,
    }));
  }

  async findById(id: number): Promise<DetailMedia> {
    const result: TvDetailDbResponse = await this.tvRepository.findById(id);
    return this.tvDetailDbResultToMediaParser(result);
  }

  tvDetailDbResultToMediaParser(result: TvDetailDbResponse): DetailMedia {
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
      name: name || original_name,
      posterPath: poster_path,
      releaseDate: first_air_date,
      voteAverage: vote_average,
      overview,
      tagline,
      homepage,
      actors,
    };
  }
}
