import { createAsyncThunk } from "@reduxjs/toolkit";
import { shuffleArray } from "@/utils/helpers/customFunctions";
import { handleAxiosGetRequest } from "@/utils/helpers/httpRequest";
import {
  GET_ACTORS_URL,
  GET_MOVIE_GENRE_URL,
  GET_POPULAR_MOVIES_URL,
  GET_TRENDING_MOVIES_URL,
  GET_TV_SERIES_URL,
  GET_UPCOMING_MOVIES_URL,
} from "@/utils/config/urlConfigs";

export const getAllMovies = createAsyncThunk(
  "movies/getAllMovies",
  async (payload) => {
    let pages = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    let index = Math.floor(Math.random() * pages?.length);
    let page = pages[index];
    return await handleAxiosGetRequest(GET_POPULAR_MOVIES_URL(page));
  }
);

export const getUpcomingMovies = createAsyncThunk(
  "movies/getUpcomingMovies",
  async (payload) => {
    let pages = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    let index = Math.floor(Math.random() * pages?.length);
    let page = pages[index];
    return await handleAxiosGetRequest(GET_UPCOMING_MOVIES_URL(page));
  }
);

export const getTrendingMovies = createAsyncThunk(
  "movies/getTrendingMovies",
  async (payload) => {
    let pages = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    let index = Math.floor(Math.random() * pages?.length);
    let page = pages[index];

    return await handleAxiosGetRequest(GET_TRENDING_MOVIES_URL(page));
  }
);

export const getActors = createAsyncThunk(
  "movies/getActors",
  async (payload) => {
    let movieIDS = shuffleArray([
      572802, 299536, 891699, 1071215, 872585, 1726, 447277, 823464, 603,
      335984, 238, 122, 329, 475557, 46648, 313369,
    ]);
    let index = Math.floor(Math.random() * movieIDS?.length);
    let id = movieIDS[index];

    return await handleAxiosGetRequest(GET_ACTORS_URL(id));
  }
);

export const getTvSeries = createAsyncThunk(
  "movies/getTvSeries",
  async (payload) => {
    let pages = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    let index = Math.floor(Math.random() * pages?.length);
    let page = pages[index];

    return await handleAxiosGetRequest(GET_TV_SERIES_URL(page));
  }
);

export const getGenres = createAsyncThunk(
  "movies/getGenres",
  async (payload?: string) => {
    return await handleAxiosGetRequest(GET_MOVIE_GENRE_URL());
  }
);
