import { FlatList, SafeAreaView, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { scale } from "react-native-size-matters";
import CustomStatusBar from "@/components/custom/CustomStatusBar";
import ThemeContext from "@/themes/themeContext";
import HeaderBack from "@/components/header/HeaderBack";
import MovieItem from "@/components/movies/MovieItem";
import NoItem from "@/components/movies/NoItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import ColLoading from "@/components/loader/ColLoading";
import { ActivityIndicator } from "react-native";

import { handleAxiosGetRequest } from "@/utils/helpers/httpRequest";
import { removeDuplicateId } from "@/utils/helpers/customFunctions";
import { RootStackParamList } from "@/navigations/ScreenStack";
import { allMovieType } from "@/types/movieType";
import {
  GET_ACTORS_URL,
  GET_CATEGORY_URL,
  GET_POPULAR_MOVIES_URL,
  GET_TRENDING_MOVIES_URL,
  GET_TV_SERIES_URL,
  GET_UPCOMING_MOVIES_URL,
} from "@/utils/config/urlConfigs";

type MovieCategoryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, "MovieCategoryScreen">;
};

const MovieCategoryScreen = ({
  navigation,
  route,
}: MovieCategoryScreenProps) => {
  const { item: movieItem, id, payload } = route?.params;
  const theme = useContext(ThemeContext);

  const [categoryMovies, setCategoryMovies] = useState<allMovieType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (payload?.length > 0) {
      setTimeout(() => {
        setCategoryMovies(payload);
        setIsLoading(false);
        setIsContentLoading(false);
        setCurrentPage(1);
        setTotalPages(10);
      }, 1000);
    } else {
      if (categoryMovies?.length <= 0) {
        fetchData(currentPage);
      }
    }
  }, []);

  const fetchNextPage = () => {
    if (flatListRef?.current == null) {
      return;
    }

    if (isContentLoading === true) {
      return;
    }

    if (currentPage === totalPages) {
      return;
    }

    let newCurrentPage = currentPage + 1;
    setCurrentPage(newCurrentPage);
    fetchData(newCurrentPage);
  };

  const fetchData = (page: number) => {
    setIsContentLoading(true);
    let URL = "";
    if (movieItem === "POPULAR") {
      URL = GET_POPULAR_MOVIES_URL(page);
    }

    if (movieItem === "SERIES") {
      URL = GET_TV_SERIES_URL(page);
    }

    if (movieItem === "ACTORS") {
      URL = GET_ACTORS_URL(page);
    }

    if (movieItem === "TRENDING") {
      URL = GET_TRENDING_MOVIES_URL(page);
    }

    if (movieItem === "UPCOMING") {
      URL = GET_UPCOMING_MOVIES_URL(page);
    }

    if (
      !["POPULAR", "SERIES", "ACTORS", "TRENDING", "UPCOMING"].includes(
        movieItem
      )
    ) {
      URL = GET_CATEGORY_URL(id, page);
    }

    handleAxiosGetRequest(URL)
      .then((response) => {
        !isFirstPageReceived && setIsFirstPageReceived(true);
        if (response?.results) {
          let catMovie: allMovieType[] = removeDuplicateId([
            ...categoryMovies,
            ...response?.results,
          ]);
          setCategoryMovies(catMovie);
        }

        setCurrentPage(response?.page);
        setTotalPages(response?.total_results);
        setIsContentLoading(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme?.background }}>
      <CustomStatusBar />
      <HeaderBack
        title={movieItem.toUpperCase()}
        handleClose={() => navigation.goBack()}
        hasMenu={false}
        isUpperCase={true}
      />
      {isLoading ? (
        <View
          style={{
            paddingBottom: scale(10),
            marginTop: 0,
            width: "100%",
          }}
        >
          <ColLoading
            height={scale(250)}
            numbCol={2}
            onlyOne={false}
            numberOfItem={8}
          />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={removeDuplicateId(categoryMovies)}
          numColumns={2}
          columnWrapperStyle={{
            columnGap: 10,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <MovieItem
              item={item}
              index={index}
              key={item?.id}
              type={"double"}
              movieType={movieItem === "SERIES" ? "series" : "movie"}
              spaceMore={true}
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: scale(10),
            marginTop: scale(10),
            paddingBottom: scale(40),
          }}
          onEndReached={fetchNextPage}
          ListEmptyComponent={
            <View style={{ flex: 1 }}>
              <NoItem
                icon="movie"
                text={"No Movie"}
                des={""}
                buttonText=""
                onPress={() => {}}
              />
            </View>
          }
          onEndReachedThreshold={0.8}
          ListFooterComponent={
            <View style={{ marginTop: scale(10) }}>
              {isContentLoading ? (
                <ActivityIndicator size="large" color={theme?.color} />
              ) : null}
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default MovieCategoryScreen;
