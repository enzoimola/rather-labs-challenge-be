import { Injectable } from '@nestjs/common';
import { MovieDbResponseResult } from '../../models/types/movie-db-response/movie-db-response-result.type';
import { MovieDetailDbResponse } from '../../models/types/movie-db-response/movie-detail-db-response';
import * as process from 'process';

@Injectable()
export class MovieRepository {
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  async findAll(): Promise<Array<MovieDbResponseResult>> {
    const url = process.env.API_URL_POPULAR_MOVIES;
    try {
      const response = await fetch(url, this.options);
      const json = await response.json();
      return json.results;
    } catch (e) {
      throw new Error('Error fetching movies: ' + e.message);
    }
  }

  async findById(id: number): Promise<MovieDetailDbResponse> {
    const url = `${process.env.API_URL_MOVIES}${id}?${process.env.API_URL_CREDITS}`;

    try {
      const response = await fetch(url, this.options);
      const json = await response.json();
      return json;
    } catch (e) {
      throw new Error('Error fetching movies: ' + e.message);
    }
  }
}
