import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { scale } from "react-native-size-matters";
import { Image } from "expo-image";
import colors from "@/styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../custom/CustomButton";
import { setLoadingModal, setToastModal } from "@/store/alertSlice/alertSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ColLoading from "../loader/ColLoading";

import { handleAxiosGetRequest } from "../../utils/helpers/httpRequest";
import { blurhash, formateDateByName } from "@/utils/helpers/customFunctions";
import { RootStackParamList } from "@/navigations/ScreenStack";

import { allMovieType } from "@/types/movieType";
import {
  GET_SINGLE_MOVIE_URL,
  GET_SINGLE_TV_SERIES_URL,
} from "@/utils/config/urlConfigs";

const HomeBanner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { currentMovie, loadingAllMovies, IMAGEURL } = useSelector(
    (state: RootState) => state.movies
  );

  const fetchMovieDetails = useCallback(async (request: allMovieType) => {
    dispatch(
      setLoadingModal({
        status: true,
        message: "Please wait ...",
      })
    );
    let newID: number = request?.id || 1;
    let URL = "";
    if (request?.media_type === "tv") {
      URL = GET_SINGLE_TV_SERIES_URL(newID);
    } else {
      URL = GET_SINGLE_MOVIE_URL(newID);
    }
    const result = await handleAxiosGetRequest(URL);
    if (result) {
      if (result?.poster_path === null) {
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
          movieType: request?.media_type === "tv" ? "series" : "movie",
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

  return (
    <>
      {loadingAllMovies ? (
        <View
          style={{
            marginBottom: scale(-40),
            marginTop: 0,
            width: "100%",
          }}
        >
          <ColLoading height={360} numbCol={1} onlyOne={true} type={"banner"} />
        </View>
      ) : (
        currentMovie && (
          <View style={[styles.homeBannerContainer]}>
            {currentMovie?.poster_path && (
              <Image
                source={IMAGEURL + currentMovie?.poster_path}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                }}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
              />
            )}

            <View style={styles.bannerwrapper}>
              <LinearGradient
                colors={[
                  "rgba(0, 0, 0, 0.9)",
                  "rgba(0, 0, 0, 0.7)",
                  "rgba(0, 0, 0, 0.5)",
                  "rgba(0, 0, 0, 0.3)",
                  "rgba(0, 0, 0, 0.1)",
                  "transparent",
                ]}
                style={styles.linearGradient}
                end={{ x: 0.7, y: 0.06 }}
              >
                <Text style={[styles.bannerTitle]}>{currentMovie?.title}</Text>
                <Text style={styles.bannerDate}>
                  {formateDateByName(currentMovie?.release_date)}
                </Text>
                <Text numberOfLines={4} style={styles.bannerDesc}>
                  {currentMovie?.overview}
                </Text>
                <View style={{ width: scale(200), marginTop: scale(20) }}>
                  <CustomButton
                    allCaps={false}
                    color="#333"
                    onPress={() => {
                      fetchMovieDetails(currentMovie);
                    }}
                    title="Details"
                    valid={true}
                  />
                </View>
              </LinearGradient>
            </View>
          </View>
        )
      )}
    </>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  homeBannerContainer: {
    position: "relative",
    width: "100%",
    height: scale(350),
  },
  linearGradient: {
    height: "100%",
    width: "100%",
    paddingHorizontal: scale(25),
    paddingTop: scale(40),
  },
  bannerwrapper: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
  },

  bannerTitle: {
    fontSize: scale(22),
    lineHeight: scale(28),
    color: "#fff",
    fontFamily: "PoppinsBold",
    marginBottom: scale(9),
  },
  bannerDate: {
    fontSize: scale(14),
    color: colors.PRIMARY.yellow,
    fontFamily: "PoppinsLight",
  },
  bannerDesc: {
    fontSize: scale(13.5),
    lineHeight: scale(20),
    color: "#fff",
    marginTop: scale(9),
    fontFamily: "PoppinsLight",
  },
});
