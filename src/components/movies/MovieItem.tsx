import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { allMovieType } from "@/types/movieType";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { setLoadingModal, setToastModal } from "@/store/alertSlice/alertSlice";
import { handleAxiosGetRequest } from "../../utils/helpers/httpRequest";
import { RootStackParamList } from "@/navigations/ScreenStack";
import { Image } from "expo-image";
import { blurhash } from "@/utils/helpers/customFunctions";
import {
  GET_SINGLE_ACTOR_DETAILS_URL,
  GET_SINGLE_MOVIE_URL,
  GET_SINGLE_TV_SERIES_URL,
} from "@/utils/config/urlConfigs";

type movieItemProps = {
  index: number;
  item: allMovieType;
  type: string;
  movieType: string;
  spaceMore?: boolean;
};

const { width } = Dimensions.get("screen");

const MovieItem = ({
  index,
  item,
  type,
  movieType,
  spaceMore = false,
}: movieItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { IMAGEURL } = useSelector((state: RootState) => state.movies);

  let URL =
    movieType === "actors"
      ? IMAGEURL + item?.profile_path
      : IMAGEURL + item?.poster_path;
  let IMAGEPOSTER =
    movieType === "actors" ? item?.profile_path : item?.poster_path;

  const animationType =
    type === "single"
      ? FadeInRight.delay(200 * index)
      : FadeInDown.delay(200 * index);

  const fetchMovieDetails = useCallback(async () => {
    dispatch(
      setLoadingModal({
        status: true,
        message: "Please wait ...",
      })
    );
    let URL = "";

    if (movieType === "actors") {
      URL = GET_SINGLE_ACTOR_DETAILS_URL(item?.id);
    } else if (item?.media_type === "tv") {
      URL = GET_SINGLE_TV_SERIES_URL(item?.id);
    } else {
      URL = GET_SINGLE_MOVIE_URL(item?.id);
    }

    const result = await handleAxiosGetRequest(URL);

    if (result) {
      if (movieType !== "actors" && result?.poster_path === null) {
        dispatch(
          setToastModal({
            status: true,
            type: "FAILED",
            message: "An error occured while trying to fetch this movie",
          })
        );
      } else {
        navigation.navigate("MovieDetailsScreen", {
          item: result,
          movieID: result?.id,
          movieType:
            item?.media_type === "tv"
              ? "series"
              : item?.media_type === "movie"
              ? "movie"
              : movieType,
        });
      }
    } else {
      dispatch(
        setToastModal({
          status: true,
          type: "FAILED",
          message: "An error occured while trying to fetch this movie",
        })
      );
    }

    dispatch(
      setLoadingModal({
        status: false,
        message: "",
      })
    );
  }, []);

  if (IMAGEPOSTER === null) {
    return;
  }

  return (
    IMAGEPOSTER && (
      <Animated.View
        entering={animationType}
        style={[
          type === "single" && index === 0 && { marginLeft: scale(15) },
          type === "single" ? styles.card : styles.card2,
          spaceMore === true && { width: "49%" },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            fetchMovieDetails();
          }}
        >
          <Image
            source={URL}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
            placeholder={blurhash}
            contentFit="cover"
            transition={1000}
          />
        </TouchableOpacity>
      </Animated.View>
    )
  );
};

export default MovieItem;

const styles = StyleSheet.create({
  card: {
    position: "relative",
    width: width * 0.37,
    height: scale(250),
    borderRadius: 1,
    marginRight: scale(10),
    paddingTop: scale(10),
    marginBottom: scale(14),
    textAlign: "left",
  },
  card2: {
    position: "relative",
    width: "47%",
    height: scale(270),
    borderRadius: 1,
    marginBottom: scale(5),
  },
});
