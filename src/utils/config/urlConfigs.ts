import {
  REACT_APP_APIKEY,
  REACT_APP_ACCESSTOKEN,
  REACT_APP_BASEURL,
} from "@env";

const APIKEY = REACT_APP_APIKEY;
const ACCESSTOKEN = REACT_APP_ACCESSTOKEN;
const BASEURL = REACT_APP_BASEURL;
const GET_AUTHENTICATION_URL = `/authentication`;

const GET_POPULAR_MOVIES_URL = (page: number) => {
  return `/movie/popular?page=${page}`;
};

const GET_TV_SERIES_URL = (page: number) => {
  return `/tv/popular?page=${page}`;
};

const GET_TV_SERIES_SEASON_DETAILS_URL = (id: number, season: number) => {
  return `/tv/${id}/season/${season}`;
};

const GET_TV_SERIES_SEASON_IMAGES_URL = (id: number, season: number) => {
  return `/tv/${id}/season/${season}/images`;
};

const GET_TV_SERIES_EPISODE_DETAILS_URL = (
  id: number,
  season: number,
  episode: number
) => {
  return `/tv/${id}/season/${season}/episode/${episode}`;
};

const GET_TV_SERIES_EPISODE_CREDITS_URL = (
  id: number,
  season: number,
  episode: number
) => {
  return `/tv/${id}/season/${season}/episode/${episode}/credits`;
};

const GET_TV_SERIES_EPISODE_IMAGES_URL = (
  id: number,
  season: number,
  episode: number
) => {
  return `/tv/${id}/season/${season}/episode/${episode}/images`;
};

const GET_TV_SERIES_EPISODE_VIDEOS_URL = (
  id: number,
  season: number,
  episode: number
) => {
  return `/tv/${id}/season/${season}/episode/${episode}/videos`;
};

const GET_UPCOMING_MOVIES_URL = (page: number) => {
  return `/movie/upcoming?page=${page}`;
};

const GET_TRENDING_MOVIES_URL = (page: number) => {
  return `/trending/all/week?page=${page}`;
};

const GET_ACTORS_URL = (id: number) => {
  return `/movie/${id}/credits`;
};
const GET_SINGLE_MOVIE_URL = (id: number) => {
  return `/movie/${id}`;
};

const GET_SINGLE_TV_SERIES_URL = (id: number) => {
  return `/tv/${id}`;
};

const GET_SINGLE_ACTOR_DETAILS_URL = (id: number) => {
  return `/person/${id}`;
};

const GET_CREWS_URL = (id: string) => {
  return `/movie/${id}/credits`;
};

const GET_VIDEOS_URL = (id: string) => {
  return `/movie/${id}/videos`;
};

const GET_RELATED_MOVIES_URL = (id: string) => {
  return `/movie/${id}/recommendations`;
};

const GET_RELATED_URL = (id: string, type: string) => {
  return `/${type}/${id}/recommendations`;
};

const GET_REVIEW_URL = (id: string, type: string) => {
  return `/${type}/${id}/reviews`;
};

const GET_IMAGES_URL = (id: string, type: string) => {
  return `/${type}/${id}/images`;
};

const GET_ACTOR_RELATED_MOVIES_URL = (id: string) => {
  return `/person/${id}/movie_credits`;
};

const GET_CATEGORY_URL = (id: string, page: number) => {
  return `/discover/movie?with_genres=${id}&page=${page}`;
};

const GET_SEARCH_URL = (query: string, page: number) => {
  return `/search/movie?query=${query}&page=${page}`;
};

const GET_MOVIE_GENRE_URL = (language?: string) => {
  return `/genre/movie/list?language=${language || "en"}`;
};

export {
  BASEURL,
  APIKEY,
  ACCESSTOKEN,
  GET_AUTHENTICATION_URL,
  GET_MOVIE_GENRE_URL,
  GET_UPCOMING_MOVIES_URL,
  GET_TRENDING_MOVIES_URL,
  GET_TV_SERIES_URL,
  GET_POPULAR_MOVIES_URL,
  GET_ACTORS_URL,
  GET_SINGLE_MOVIE_URL,
  GET_SINGLE_TV_SERIES_URL,
  GET_SINGLE_ACTOR_DETAILS_URL,
  GET_CREWS_URL,
  GET_VIDEOS_URL,
  GET_RELATED_MOVIES_URL,
  GET_ACTOR_RELATED_MOVIES_URL,
  GET_CATEGORY_URL,
  GET_SEARCH_URL,
  GET_RELATED_URL,
  GET_TV_SERIES_SEASON_DETAILS_URL,
  GET_TV_SERIES_EPISODE_DETAILS_URL,
  GET_TV_SERIES_SEASON_IMAGES_URL,
  GET_IMAGES_URL,
  GET_TV_SERIES_EPISODE_CREDITS_URL,
  GET_TV_SERIES_EPISODE_IMAGES_URL,
  GET_TV_SERIES_EPISODE_VIDEOS_URL,
  GET_REVIEW_URL,
};
