import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { scale } from "react-native-size-matters";
import CustomStatusBar from "@/components/custom/CustomStatusBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ThemeContext from "@/themes/themeContext";
import Header from "@/components/header/Header";
import HomeBanner from "@/components/banner/HomeBanner";
import MovieRow from "@/components/movies/MovieRow";
import {
  ParamListBase,
  RouteProp,
  useIsFocused,
  useScrollToTop,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  getActors,
  getAllMovies,
  getTrendingMovies,
  getTvSeries,
  getUpcomingMovies,
} from "@/store/movieSlice/actions";
import { shuffleArray } from "@/utils/helpers/customFunctions";
import { setCurrentMovie } from "@/store/movieSlice/movieSlice";
import { RefreshControl } from "react-native";
import { RootStackParamList } from "@/navigations/ScreenStack";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<ParamListBase>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useContext(ThemeContext);
  const {
    movies,
    loadingAllMovies,
    upCommingmovies,
    loadingUpcomingMovies,
    trendingMovies,
    loadingTrendingMovies,
    allActors,
    loadingActors,
    tvseries,
    loadingTvseries,
  } = useSelector((state: RootState) => state.movies);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const isFocused = useIsFocused();

  const changeCurrentMovie = useCallback(() => {
    if (movies?.length > 0) {
      let index = Math.floor(Math.random() * movies?.length);
      let newCurrentMovie = movies[index];
      dispatch(setCurrentMovie(newCurrentMovie));
    }
  }, []);

  useScrollToTop(scrollViewRef);

  useEffect(() => {
    if (isFocused) {
      changeCurrentMovie();
    }

    return () => {};
  }, [isFocused]);

  useEffect(() => {
    return () => {
      scrollViewRef?.current?.scrollTo({ x: 0, y: 0, animated: false });
    };
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(getUpcomingMovies());
    dispatch(getTrendingMovies());
    dispatch(getActors());
    dispatch(getTvSeries());
    dispatch(getAllMovies());

    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme?.background }}>
      <CustomStatusBar />
      <Header />
      <ScrollView
        scrollsToTop={true}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: scale(50),
        }}
        refreshControl={
          <RefreshControl
            tintColor={theme?.color}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <HomeBanner />
        <MovieRow
          movies={shuffleArray(upCommingmovies)}
          title="UPCOMING MOVIES"
          rightTitle="SEE ALL"
          handleClick={() => {
            navigation.navigate("MovieCategoryScreen", {
              item: "UPCOMING",
              id: "UPCOMING",
              payload: upCommingmovies,
            });
          }}
          type="single"
          movieType="movie"
          hasInfiniteScroll={false}
          isLoading={loadingUpcomingMovies}
          isUser={false}
        />

        <MovieRow
          movies={shuffleArray(trendingMovies)?.slice(0, 8)}
          title="TRENDING MOVIES"
          rightTitle="SEE ALL"
          handleClick={() => {
            navigation.navigate("MovieCategoryScreen", {
              item: "TRENDING",
              id: "TRENDING",
              payload: trendingMovies,
            });
          }}
          type="single"
          hasInfiniteScroll={false}
          movieType="movie"
          isLoading={loadingTrendingMovies}
          isUser={false}
        />

        <MovieRow
          movies={allActors}
          title="ACTORS"
          rightTitle=""
          handleClick={() => {
            navigation.navigate("MovieCategoryScreen", {
              item: "ACTORS",
              id: "ACTORS",
              payload: allActors,
            });
          }}
          type="single"
          movieType="actors"
          isUser={true}
          hasInfiniteScroll={false}
          isLoading={loadingActors}
        />

        <MovieRow
          movies={shuffleArray(tvseries)?.slice(0, 8)}
          title="TV SERIES"
          rightTitle="SEE ALL"
          handleClick={() => {
            navigation.navigate("MovieCategoryScreen", {
              item: "SERIES",
              id: "SERIES",
              payload: tvseries,
            });
          }}
          type="single"
          hasInfiniteScroll={false}
          movieType="series"
          isUser={false}
          isLoading={loadingTvseries}
        />
        <MovieRow
          movies={shuffleArray(movies)}
          title="POPULAR MOVIES"
          rightTitle="SEE ALL"
          handleClick={() => {
            navigation.navigate("MovieCategoryScreen", {
              item: "POPULAR",
              id: "POPULAR",
              payload: movies,
            });
          }}
          type="double"
          hasInfiniteScroll={false}
          isUser={false}
          movieType="movie"
          isLoading={loadingAllMovies}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
