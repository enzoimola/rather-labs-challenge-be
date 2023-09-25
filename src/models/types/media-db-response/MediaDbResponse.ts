import { MediaDbResponseResult } from './MediaDbResponseResult.type';

export type MediaDbResponse = {
  page: number;
  results: Array<MediaDbResponseResult>;
  total_pages: number;
  total_results: number;
};
