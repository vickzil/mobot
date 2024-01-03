import { ImageSourcePropType } from "react-native";

export type movieType = {
  id: number;
  image: ImageSourcePropType;
  title: string;
  release_date: string;
  description: string;
};

export type posterType = {
  aspect_ratio: number;
  file_path: string | null;
  height: number;
  width: number;
};

export type seasonsType = {
  id: number;
  episode_count: number;
  season_number: number;
  air_date: string;
  poster_path: string | null;
  name: string;
  overview: string;
  vote_average: number;
};

export type episodeCrewType = {
  id: number;
  credit_id: number;
  adult: boolean;
  department: string;
  job: string;
  known_for_department: string;
  poster_path: string | null;
  profile_path: string | null;
  name: string;
  original_name: string;
  popularity: number;
};

export type episodeType = {
  id: number;
  crew: episodeCrewType[];
  guest_stars: episodeCrewType[];
  episode_number: number;
  episode_type: string;
  air_date: string;
  poster_path: string | null;
  still_path: string | null;
  name: string;
  overview: string;
  vote_average: number;
  runtime: number;
  show_id: number;
};

export type seasonsDetailsType = {
  id: number;
  episodes: episodeType[];
  season_number: number;
  air_date: string;
  poster_path: string | null;
  name: string;
  overview: string;
  vote_average: number;
};

export type allMovieType = {
  id: number;
  backdrop_path: string;
  adult: boolean;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  release_date: string;
  description: string;
  genre_ids: number[];
  profile_path: string;
  biography: string;
  place_of_birth: string;
  birthday: string;
  known_for_department: string;
  movieType: string;
  media_type: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  seasons?: seasonsType[];
};

export type actorsType = {
  id: number;
  cast_id: number;
  name: string;
  original_name: string;
  credit_id: string;
  character: string;
  overview: string;
  gender: number;
  popularity: number;
  order: number;
  video: boolean;
  profile_path: string;
  known_for_department: string;
};

export type ProductionCompanies = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductionCountries = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguages = ProductionCountries & {
  english_name: string;
};

export type genreType = {
  id: number;
  name: string;
};

export type reviewAuthorDetailsType = {
  avatar_path: string;
  name: string;
  username: string;
  rating: number;
};
export type reviewType = {
  id: string;
  author: string;
  content: string;
  created_at: string;
  url: string;
  author_details: reviewAuthorDetailsType;
};

export type singleMovieType = allMovieType & {
  budget: number;
  name: string;
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  spoken_languages: SpokenLanguages[];
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  first_air_date: string;
  genres: genreType[];
};

export type videoType = {
  id: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
};
