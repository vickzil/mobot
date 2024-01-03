import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { scale } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ThemeContext from "@/themes/themeContext";
import ReAnimated, { FadeInDown } from "react-native-reanimated";
import colors from "@/styles/colors";
import CustomButton from "@/components/custom/CustomButton";
import DescriptionList from "@/components/movies/DescriptionList";
import MovieRow from "@/components/movies/MovieRow";
import { setLoadingModal, setToastModal } from "@/store/alertSlice/alertSlice";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { setFavourites } from "@/store/movieSlice/movieSlice";
import {
  allMovieType,
  posterType,
  reviewType,
  singleMovieType,
  videoType,
} from "@/types/movieType";
import {
  blurhash,
  calculateAge,
  formateDateByName,
  handleAddRemoveData,
} from "@/utils/helpers/customFunctions";
import { RootStackParamList } from "@/navigations/ScreenStack";

import MovieItem from "@/components/movies/MovieItem";
import PosterItem from "@/components/movies/PosterItem";
import SessionTitle from "@/components/custom/SessionTitle";
import { handleAxiosGetRequest } from "@/utils/helpers/httpRequest";
import {
  GET_ACTOR_RELATED_MOVIES_URL,
  GET_CREWS_URL,
  GET_IMAGES_URL,
  GET_RELATED_URL,
  GET_REVIEW_URL,
  GET_TV_SERIES_SEASON_DETAILS_URL,
  GET_VIDEOS_URL,
} from "@/utils/config/urlConfigs";
import ReviewItem from "@/components/movies/ReviewItem";
import {
  ImageHeaderScrollView,
  TriggeringView,
} from "@/utils/plugins/react-native-image-header-scroll-view/lib";

type MovieDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, "MovieDetailsScreen">;
};

const MovieDetailsScreen = ({ navigation, route }: MovieDetailsScreenProps) => {
  const { item, movieID, movieType } = route?.params;
  const dispatch = useDispatch<AppDispatch>();

  const theme = useContext(ThemeContext);
  const { darkMode } = useSelector((state: RootState) => state.oauth);
  const { loadingUpcomingMovies, IMAGEURL, favourites } = useSelector(
    (state: RootState) => state.movies
  );

  const [videos, setVideos] = useState<videoType[]>([]);
  const [crews, setCrews] = useState<allMovieType[]>([]);
  const [relatedMovies, setRelatedMovies] = useState<allMovieType[]>([]);
  const [actorsMovies, setActorsMovies] = useState<allMovieType[]>([]);
  const [Images, setImages] = useState<posterType[]>([]);
  const [reviews, setReviews] = useState<reviewType[]>([]);

  const POSTERTYPE =
    movieType === "actors" ? item?.profile_path : item?.poster_path;

  const POSTERURL = IMAGEURL + POSTERTYPE;

  // Memoize the formatted date using useMemo
  const formattedDate = useMemo(() => {
    return formateDateByName(item?.release_date || item?.first_air_date);
  }, [item?.release_date, item?.first_air_date]);

  const showPreviewModal = () => {
    dispatch(
      setLoadingModal({
        status: true,
        message: "Please wait...",
      })
    );

    setTimeout(() => {
      dispatch(
        setLoadingModal({
          status: false,
          message: "",
        })
      );

      navigation.navigate("MoviePlayer", {
        item: videos,
        movieID: videos[0]?.key,
      });
    }, 2000);
  };

  useEffect(() => {
    if (movieID) {
      fetchDatas();
    }
  }, [movieID]);

  const fetchDatas = () => {
    if (movieType !== "actors") {
      fetchVideos();
      fetchCrews();
      fetchRelatedMovies();
      fetchReviews();
    }
    if (movieType === "actors") {
      fetchActorsRelatedMovies();
    }

    fetchImages();
  };

  const isInFavourite = (data: singleMovieType) => {
    let alreadyIn = favourites.find((favourite) => favourite?.id === data?.id);
    return !!alreadyIn;
  };

  const handleAddRemoveFavourite = (data: singleMovieType) => {
    const { returnedData, isRemoved } = handleAddRemoveData(
      favourites,
      data,
      movieType
    );

    AsyncStorage.setItem("favourites", JSON.stringify(returnedData));
    dispatch(setFavourites(returnedData));

    dispatch(
      setToastModal({
        status: true,
        type: "",
        message: isRemoved ? "Removed from Favourites" : "Added to Favourites",
      })
    );
  };

  const fetchVideos = useCallback(async () => {
    const result = await handleAxiosGetRequest(GET_VIDEOS_URL(movieID));
    if (result?.results) {
      setVideos(result?.results);
    }
  }, []);

  const fetchCrews = useCallback(async () => {
    const result = await handleAxiosGetRequest(GET_CREWS_URL(movieID));
    if (result?.cast) {
      setCrews(result?.cast);
    }
  }, []);

  const fetchRelatedMovies = useCallback(async () => {
    let urlType = movieType === "series" ? "tv" : "movie";
    const result = await handleAxiosGetRequest(
      GET_RELATED_URL(movieID, urlType)
    );

    if (result?.results) {
      setRelatedMovies(result?.results);
    }
  }, []);

  const fetchActorsRelatedMovies = useCallback(async () => {
    const result = await handleAxiosGetRequest(
      GET_ACTOR_RELATED_MOVIES_URL(movieID)
    );
    if (result?.cast) {
      setActorsMovies(result?.cast);
    }
  }, []);

  const handleFetchSeasonDetails = useCallback(
    async (id: number, seasonNumber: number, title: string) => {
      dispatch(
        setLoadingModal({
          status: true,
          message: "Please wait ...",
        })
      );

      const URL = GET_TV_SERIES_SEASON_DETAILS_URL(id, seasonNumber);

      const result = await handleAxiosGetRequest(URL);
      if (result) {
        navigation.navigate("SeasonDetailsScreen", {
          payload: result,
          id: result?.id,
          title: title,
          seriesID: item?.id,
        });
      }

      dispatch(
        setLoadingModal({
          status: false,
          message: "",
        })
      );
    },
    []
  );

  const fetchImages = useCallback(async () => {
    let urlType =
      movieType === "series"
        ? "tv"
        : movieType === "movie"
        ? "movie"
        : "person";

    const result = await handleAxiosGetRequest(
      GET_IMAGES_URL(movieID, urlType)
    );

    if (result) {
      setImages(result?.backdrops || result?.profiles);
    }
  }, []);

  const fetchReviews = useCallback(async () => {
    let urlType = movieType === "series" ? "tv" : "movie";
    const result = await handleAxiosGetRequest(
      GET_REVIEW_URL(movieID, urlType)
    );

    if (result?.results) {
      setReviews(result?.results);
    }
  }, []);

  const NavigationBack = ({ hasAbsolute = false }) => {
    return (
      <View
        style={{
          position: "absolute",
          top: Platform.OS === "android" ? "10%" : "10%",
          width: "100%",
          paddingHorizontal: scale(15),
          paddingTop: hasAbsolute ? 0 : "10%",
          zIndex: 100000000,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: scale(0),
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#222",
              borderRadius: 6,
              paddingHorizontal: scale(4),
              alignSelf: "flex-start",
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="chevron-back-sharp"
              size={scale(27)}
              style={[{ color: "#fff", marginRight: 0 }]}
            />
          </TouchableOpacity>
          {movieType !== "actors" && (
            <TouchableOpacity
              style={{
                backgroundColor: "#222",
                padding: scale(4),
                borderRadius: 50,
              }}
              onPress={() => {
                handleAddRemoveFavourite(item);
              }}
            >
              <Ionicons
                name={isInFavourite(item) ? "heart-sharp" : "heart-outline"}
                size={scale(27)}
                color={isInFavourite(item) ? colors.PRIMARY.yellow : "#fff"}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme?.background,
        position: "relative",
      }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={darkMode ? "light-content" : "dark-content"}
      />
      <ImageHeaderScrollView
        maxHeight={scale(450)}
        minHeight={90}
        renderHeader={() => (
          <View style={{ zIndex: 1000, elevation: 35, position: "relative" }}>
            <NavigationBack hasAbsolute={false} />
          </View>
        )}
        renderForeground={() => (
          <View style={{ position: "relative" }}>
            <Image
              source={POSTERURL}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
              }}
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
            />
            <NavigationBack hasAbsolute={true} />
          </View>
        )}
        scrollViewBackgroundColor={theme?.background}
        overlayColor={theme?.background}
      >
        <TriggeringView>
          <View
            style={{
              position: "relative",
              paddingBottom: scale(40),
            }}
          >
            {item && (
              <>
                {movieType === "actors" && (
                  <>
                    <ReAnimated.View
                      entering={FadeInDown.delay(800)}
                      style={{
                        paddingVertical: scale(20),
                        paddingHorizontal: scale(15),
                      }}
                    >
                      <Text
                        style={[styles.bannerTitle, { color: theme?.color }]}
                      >
                        {item?.name}
                      </Text>

                      <Text
                        style={[styles.bannerDesc, { color: theme?.color }]}
                      >
                        {item?.biography}
                      </Text>
                    </ReAnimated.View>
                    <ReAnimated.View
                      entering={FadeInDown.delay(1000)}
                      style={{
                        paddingVertical: scale(20),
                        paddingHorizontal: scale(15),
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          flexWrap: "wrap",
                          columnGap: 30,
                        }}
                      >
                        {item?.birthday && (
                          <DescriptionList
                            title="Birthday"
                            description={formateDateByName(item?.birthday)}
                          />
                        )}
                        {item?.birthday && (
                          <DescriptionList
                            title="Age"
                            description={calculateAge(item?.birthday)}
                          />
                        )}
                        {item?.place_of_birth && (
                          <DescriptionList
                            title="Place of Birth"
                            description={item?.place_of_birth}
                          />
                        )}

                        {item?.known_for_department && (
                          <DescriptionList
                            title="Profession"
                            description={item?.known_for_department}
                          />
                        )}
                      </View>
                    </ReAnimated.View>

                    {actorsMovies && actorsMovies?.length ? (
                      <ReAnimated.View
                        entering={FadeInDown.delay(1400)}
                        style={{
                          paddingVertical: scale(10),
                          paddingHorizontal: scale(0),
                        }}
                      >
                        <MovieRow
                          movies={actorsMovies}
                          title={`${item?.name}'s movies`}
                          rightTitle=""
                          handleClick={() => {}}
                          type="single"
                          hasInfiniteScroll={false}
                          isLoading={false}
                          movieType={"movie"}
                          isUser={false}
                        />
                      </ReAnimated.View>
                    ) : null}
                  </>
                )}
                {["movie", "series"].includes(movieType) && (
                  <>
                    <View
                      style={{
                        paddingVertical: scale(20),
                        paddingHorizontal: scale(15),
                      }}
                    >
                      <Text
                        style={[styles.bannerTitle, { color: theme?.color }]}
                      >
                        {item?.title || item?.name || "None"}
                      </Text>
                      <Text style={styles.bannerDate}>{formattedDate}</Text>
                      <Text
                        style={[styles.bannerDesc, { color: theme?.color }]}
                      >
                        {item?.overview}
                      </Text>
                    </View>
                    {videos && videos?.length ? (
                      <ReAnimated.View
                        entering={FadeInDown.delay(1000)}
                        style={{
                          paddingVertical: scale(0),
                          paddingHorizontal: scale(20),
                        }}
                      >
                        <CustomButton
                          allCaps={false}
                          color="#333"
                          onPress={() => {
                            showPreviewModal();
                          }}
                          title="Videos"
                          valid={true}
                        />
                      </ReAnimated.View>
                    ) : null}

                    <ReAnimated.View
                      entering={FadeInDown.delay(1000)}
                      style={{
                        paddingVertical: scale(20),
                        paddingHorizontal: scale(15),
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          flexWrap: "wrap",
                          columnGap: scale(30),
                        }}
                      >
                        {item?.release_date && (
                          <DescriptionList
                            title="Year"
                            description={formateDateByName(item?.release_date)}
                          />
                        )}

                        {item?.runtime && (
                          <DescriptionList
                            title="Duration"
                            description={
                              item?.runtime ? item?.runtime + " mins" : "8 mins"
                            }
                          />
                        )}

                        {item?.genres?.length ? (
                          <DescriptionList
                            title="Genre"
                            description={item?.genres[0]?.name}
                          />
                        ) : null}

                        {item?.spoken_languages?.length ? (
                          <DescriptionList
                            title="Language"
                            description={item?.spoken_languages[0]?.name}
                          />
                        ) : null}

                        {item?.production_countries?.length ? (
                          <DescriptionList
                            title="Country"
                            description={item?.production_countries[0]?.name}
                          />
                        ) : null}

                        <DescriptionList
                          title="Watch offline"
                          description={
                            item?.video
                              ? "Available to download"
                              : "Not available to download"
                          }
                        />

                        {item?.production_companies?.length ? (
                          <DescriptionList
                            title="Production Company"
                            description={item?.production_companies[0]?.name}
                          />
                        ) : null}

                        {item?.status && (
                          <DescriptionList
                            title="Status"
                            description={item?.status}
                          />
                        )}
                      </View>
                    </ReAnimated.View>
                    {item?.seasons && item?.seasons?.length ? (
                      <ReAnimated.View
                        entering={FadeInDown.delay(1200)}
                        style={{
                          paddingVertical: scale(10),
                          paddingHorizontal: scale(15),
                        }}
                      >
                        <View style={{ marginBottom: scale(10) }}>
                          <SessionTitle title="Season" />
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            alignItems: "flex-start",
                            columnGap: 15,
                          }}
                        >
                          {item?.seasons?.map((season, index) => {
                            if (index === 0 && season?.season_number === 0)
                              return;

                            return (
                              <TouchableOpacity
                                key={index}
                                style={{ alignSelf: "flex-start" }}
                                onPress={() =>
                                  handleFetchSeasonDetails(
                                    season?.id,
                                    season?.season_number,
                                    item?.name + " (" + season?.name + ")"
                                  )
                                }
                              >
                                <Text
                                  style={{
                                    fontSize: scale(13),
                                    color: theme?.color,
                                    fontFamily: "PoppinsBold",
                                    textAlign: "left",
                                    marginBottom: scale(7),
                                    letterSpacing: 2,
                                  }}
                                >
                                  {season?.name}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </ReAnimated.View>
                    ) : null}
                    {crews && crews?.length ? (
                      <ReAnimated.View
                        entering={FadeInDown.delay(1200)}
                        style={{
                          paddingVertical: scale(0),
                        }}
                      >
                        <View
                          style={{
                            marginBottom: scale(0),
                            paddingLeft: scale(15),
                          }}
                        >
                          <SessionTitle title="CASTS" />
                        </View>

                        <ScrollView
                          horizontal
                          nestedScrollEnabled
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{
                            paddingRight: scale(18),
                          }}
                        >
                          {crews?.map((item, index) => (
                            <MovieItem
                              item={item}
                              index={index}
                              key={index}
                              type={"single"}
                              movieType={"actors"}
                            />
                          ))}
                        </ScrollView>
                      </ReAnimated.View>
                    ) : null}

                    {relatedMovies && relatedMovies?.length ? (
                      <ReAnimated.View
                        entering={FadeInDown.delay(1400)}
                        style={{
                          paddingVertical: scale(0),
                          paddingHorizontal: scale(0),
                        }}
                      >
                        <MovieRow
                          movies={relatedMovies}
                          title={`RELATED ${
                            movieType === "series" ? "SERIES" : "MOVIES"
                          } `}
                          rightTitle=""
                          handleClick={() => {}}
                          type="single"
                          hasInfiniteScroll={false}
                          isLoading={loadingUpcomingMovies}
                          movieType={"movie"}
                          isUser={false}
                        />
                      </ReAnimated.View>
                    ) : null}
                  </>
                )}

                {Images && Images?.length ? (
                  <ReAnimated.View
                    entering={FadeInDown.delay(1400)}
                    style={{
                      marginTop: scale(10),
                      paddingHorizontal: scale(15),
                    }}
                  >
                    <View style={{ marginBottom: scale(5) }}>
                      <SessionTitle title="GALLERY" />
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                        columnGap: 5,
                      }}
                    >
                      {Images?.slice(0, 19)?.map((item, index) => (
                        <PosterItem
                          item={item}
                          index={index}
                          key={item?.file_path}
                          images={Images}
                        />
                      ))}
                    </View>
                  </ReAnimated.View>
                ) : null}

                {reviews && reviews?.length ? (
                  <>
                    {["movie", "series"].includes(movieType) && (
                      <ReAnimated.View
                        entering={FadeInDown.delay(1400)}
                        style={{
                          marginTop: scale(15),
                          paddingHorizontal: scale(15),
                        }}
                      >
                        <View style={{ marginBottom: scale(10) }}>
                          <SessionTitle title="REVIEWS" />
                        </View>

                        <ScrollView
                          horizontal
                          nestedScrollEnabled
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{
                            paddingRight: scale(18),
                          }}
                        >
                          {reviews?.map((review, index) => (
                            <ReviewItem
                              key={index}
                              item={review}
                              index={index}
                            />
                          ))}
                        </ScrollView>
                      </ReAnimated.View>
                    )}
                  </>
                ) : null}
              </>
            )}
          </View>
        </TriggeringView>
      </ImageHeaderScrollView>
    </View>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
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
