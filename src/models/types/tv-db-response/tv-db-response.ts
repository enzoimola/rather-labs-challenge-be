import { TvDbResponseResult } from './tv-db-response-result.type';

export type TvDbResponse = {
  page: number;
  results: Array<TvDbResponseResult>;
  total_pages: number;
  total_results: number;
};
