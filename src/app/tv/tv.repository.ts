import { Injectable } from '@nestjs/common';
import { MovieDbResponse } from '../../models/types/movie-db-response/MovieDbResponse';
import { MovieDbResponseResult } from '../../models/types/movie-db-response/MovieDbResponseResult.type';
import { TvDbResponseResult } from '../../models/types/tv-db-response/TvDbResponseResult.type';

@Injectable()
export class TvRepository {
  async findAll(): Promise<Array<TvDbResponseResult>> {
    const url = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTYwMzZlNTAxMjQxMzdiOWMzNjYyZjM0MTViMTFkZSIsInN1YiI6IjY1MGQ4MDFlOTNkYjkyMDEzOGU1MzhkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.keetD6EUEkRf5FK-JbfJIyF-C4-VwyieHnNk__jPZn8',
      },
    };

    const response = await fetch(url, options);
    const json = await response.json();
    return json.results;
  }

  findSearch(search: string) {
    return `This action returns a #${search} movie`;
  }
}
