import { createSlice } from "@reduxjs/toolkit";
import {
  getActors,
  getAllMovies,
  getGenres,
  getTrendingMovies,
  getTvSeries,
  getUpcomingMovies,
} from "./actions";
import {
  actorsType,
  allMovieType,
  genreType,
  videoType,
} from "@/types/movieType";
import { shuffleArray } from "@/utils/helpers/customFunctions";

const initialState = {
  IMAGEURL: "https://image.tmdb.org/t/p/w500",
  currentMovie: <allMovieType | null>null,
  movies: <allMovieType[]>[],
  loadingAllMovies: false,
  allMoviesError: false,
  currentAllMoviePage: 1,
  totalAllMoviePages: 10,
  upCommingmovies: <allMovieType[]>[],
  loadingUpcomingMovies: false,
  upcomingMoviesError: false,
  currentUpcomingMoviesPage: 1,
  totalUpcomingMoviesPages: 10,
  trendingMovies: <allMovieType[]>[],
  loadingTrendingMovies: false,
  trendingMoviesError: false,
  currentTrendingMoviesPage: 1,
  totalTrendingMoviesPages: 10,
  allActors: <allMovieType[]>[],
  loadingActors: false,
  actorsError: false,
  tvseries: <allMovieType[]>[],
  loadingTvseries: false,
  tvseriesError: false,
  currentTvseriesPage: 1,
  totalTvseriesPages: 10,
  favourites: <allMovieType[]>[],
  genres: <genreType[]>[],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setCurrentMovie: (state, { payload }) => {
      state.currentMovie = payload;
    },

    setFavourites: (state, { payload }) => {
      state.favourites = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllMovies.pending, (state) => {
      state.loadingAllMovies = true;
      state.allMoviesError = false;
    });

    builder.addCase(getAllMovies.fulfilled, (state, { payload }) => {
      let result = payload;
      if (result) {
        state.loadingAllMovies = false;
        state.movies = result.results;

        state.currentAllMoviePage = result.page;
        state.totalAllMoviePages = result.total_pages;
        let index = Math.floor(Math.random() * result.results?.length);
        state.currentMovie = result.results[index];
      }
    });

    builder.addCase(getAllMovies.rejected, (state) => {
      state.loadingAllMovies = false;
      state.allMoviesError = true;
    });

    builder.addCase(getUpcomingMovies.pending, (state) => {
      state.loadingUpcomingMovies = true;
      state.upcomingMoviesError = false;
    });

    builder.addCase(getUpcomingMovies.fulfilled, (state, { payload }) => {
      let result = payload;
      if (result) {
        state.loadingUpcomingMovies = false;
        state.upCommingmovies = shuffleArray(result.results);
        state.currentUpcomingMoviesPage = result.page;
        state.totalUpcomingMoviesPages = result.total_pages;
      }
    });

    builder.addCase(getUpcomingMovies.rejected, (state) => {
      state.loadingUpcomingMovies = false;
      state.upcomingMoviesError = true;
    });

    builder.addCase(getTrendingMovies.pending, (state) => {
      state.loadingTrendingMovies = true;
      state.trendingMoviesError = false;
    });

    builder.addCase(getTrendingMovies.fulfilled, (state, { payload }) => {
      let result = payload;
      if (result) {
        state.loadingTrendingMovies = false;
        state.trendingMovies = shuffleArray(result.results);
        state.currentTrendingMoviesPage = result.page;
        state.totalTrendingMoviesPages = result.total_pages;
      }
    });

    builder.addCase(getTrendingMovies.rejected, (state) => {
      state.loadingTrendingMovies = false;
      state.trendingMoviesError = true;
    });

    builder.addCase(getActors.pending, (state) => {
      state.loadingActors = true;
      state.actorsError = false;
    });

    builder.addCase(getActors.fulfilled, (state, { payload }) => {
      let result = payload;
      if (result) {
        state.loadingActors = false;
        state.allActors = result.cast;
      }
    });

    builder.addCase(getActors.rejected, (state) => {
      state.loadingActors = false;
      state.actorsError = true;
    });

    builder.addCase(getTvSeries.pending, (state) => {
      state.loadingTvseries = true;
      state.tvseriesError = false;
    });

    builder.addCase(getTvSeries.fulfilled, (state, { payload }) => {
      let result = payload;
      if (result) {
        state.loadingTvseries = false;
        state.tvseries = result.results;
        state.currentTvseriesPage = result.page;
        state.totalTvseriesPages = result.total_pages;
      }
    });

    builder.addCase(getTvSeries.rejected, (state) => {
      state.loadingTvseries = false;
      state.tvseriesError = true;
    });

    builder.addCase(getGenres.fulfilled, (state, { payload }) => {
      let result = payload;
      if (result) {
        state.genres = shuffleArray(result.genres);
      }
    });
  },
});

export const { setCurrentMovie, setFavourites } = movieSlice.actions;

export default movieSlice.reducer;
