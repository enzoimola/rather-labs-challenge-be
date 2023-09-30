import { Injectable } from '@nestjs/common';
import { TvDbResponseResult } from '../../models/types/tv-db-response/TvDbResponseResult.type';
import { TvDetailDbResponse } from '../../models/types/tv-db-response/TvDetailDbResponse';

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

  async findById(id: number): Promise<TvDetailDbResponse> {
    const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US&append_to_response=credits`;

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

    return json;
  }
}
