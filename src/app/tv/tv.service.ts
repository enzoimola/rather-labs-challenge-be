import { Injectable } from '@nestjs/common';

import { TvRepository } from './tv.repository';
import { TvDbResponseResult } from '../../models/types/tv-db-response/TvDbResponseResult.type';
import { IMedia } from '../../models/interfaces/media.interface';

@Injectable()
export class TvService {
  constructor(private readonly tvRepository: TvRepository) {}

  async findAll(): Promise<IMedia> {
    const results: Array<TvDbResponseResult> =
      await this.tvRepository.findAll();

    return this.tvDbResultToIMediaParser(results);
  }

  tvDbResultToIMediaParser(results: Array<TvDbResponseResult>): IMedia {
    return {
      result: results.map((r: TvDbResponseResult) => ({
        id: r.id,
        name: r.original_name || r.name,
      })),
    };
  }

  findSearch(search: string) {
    return `This action returns a #${search} movie`;
  }
}
