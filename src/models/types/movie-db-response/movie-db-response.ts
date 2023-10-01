import { MovieDbResponseResult } from './movie-db-response-result.type';

export type MovieDbResponse = {
  page: number;
  results: Array<MovieDbResponseResult>;
  total_pages: number;
  total_results: number;
};
