export type MovieDetailDbResponse = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: Array<IGenres>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<IProductionCompanies>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<ISpokenLanguages>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type IGenres = {
  id: number;
  name: string;
};

export type IProductionCompanies = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ISpokenLanguages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};
