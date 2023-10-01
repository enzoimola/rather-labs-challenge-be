import { Injectable } from '@nestjs/common';
import { TvDbResponseResult } from '../../models/types/tv-db-response/tv-db-response-result.type';
import { TvDetailDbResponse } from '../../models/types/tv-db-response/tv-detail-db-response';
import * as process from 'process';

@Injectable()
export class TvRepository {
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };
  async findAll(): Promise<Array<TvDbResponseResult>> {
    const url = process.env.API_URL_POPULAR_TV;

    const response = await fetch(url, this.options);
    const json = await response.json();
    return json.results;
  }

  async findById(id: number): Promise<TvDetailDbResponse> {
    const url = `${process.env.API_URL_TV}${id}?${process.env.API_URL_CREDITS}`;

    const response = await fetch(url, this.options);
    const json = await response.json();

    return json;
  }
}
