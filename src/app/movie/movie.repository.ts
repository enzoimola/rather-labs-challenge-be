import { Injectable } from '@nestjs/common';
import { MovieDbResponseResult } from '../../models/types/movie-db-response/MovieDbResponseResult.type';
import { MovieDetailDbResponse } from '../../models/types/movie-db-response/MovieDetailDbResponse';

@Injectable()
export class MovieRepository {
  async findAll(): Promise<Array<MovieDbResponseResult>> {
    const url =
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTYwMzZlNTAxMjQxMzdiOWMzNjYyZjM0MTViMTFkZSIsInN1YiI6IjY1MGQ4MDFlOTNkYjkyMDEzOGU1MzhkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.keetD6EUEkRf5FK-JbfJIyF-C4-VwyieHnNk__jPZn8',
      },
    };
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      return json.results;
    } catch (e) {
      throw new Error('Error fetching movies: ' + e.message);
    }
  }

  async findById(id: number): Promise<MovieDetailDbResponse> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=credits`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTYwMzZlNTAxMjQxMzdiOWMzNjYyZjM0MTViMTFkZSIsInN1YiI6IjY1MGQ4MDFlOTNkYjkyMDEzOGU1MzhkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.keetD6EUEkRf5FK-JbfJIyF-C4-VwyieHnNk__jPZn8',
      },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      return json;
    } catch (e) {
      throw new Error('Error fetching movies: ' + e.message);
    }
  }
}
