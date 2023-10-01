export type TvDetailDbResponse = {
  adult: string;
  backdrop_path: string;
  created_by: Array<CreatedBy>;
  episode_run_time: Array<string>;
  first_air_date: string;
  genres: Array<IGenres>;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: Array<string>;
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: string;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: string;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  networks: Array<INetworks>;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<IProductionCompanies>;
  production_countries: Array<IProductionCountries>;
  seasons: Array<ISeasons>;
  spoken_languages: Array<ISpokenLanguages>;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  credits: any;
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

export type CreatedBy = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
};

export type INetworks = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type IProductionCountries = {
  iso_3166_1: string;
  name: string;
};

export type ISeasons = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type ICredits = {
  cast: Array<ICast>;
};

export type ICast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  character: string;
  credit_id: string;
  order: number;
};
