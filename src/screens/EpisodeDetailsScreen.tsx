import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { scale } from "react-native-size-matters";
import CustomStatusBar from "@/components/custom/CustomStatusBar";
import ThemeContext from "@/themes/themeContext";
import HeaderBack from "@/components/header/HeaderBack";
import MovieItem from "@/components/movies/MovieItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "@/navigations/ScreenStack";
import { allMovieType, posterType, videoType } from "@/types/movieType";
import { blurhash, formateDateByName } from "@/utils/helpers/customFunctions";
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";

import { Image } from "expo-image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import colors from "@/styles/colors";
import PosterItem from "@/components/movies/PosterItem";
import SessionTitle from "@/components/custom/SessionTitle";
import CustomButton from "@/components/custom/CustomButton";
import { setLoadingModal } from "@/store/alertSlice/alertSlice";
import { handleAxiosGetRequest } from "@/utils/helpers/httpRequest";
import {
  GET_TV_SERIES_EPISODE_CREDITS_URL,
  GET_TV_SERIES_EPISODE_IMAGES_URL,
  GET_TV_SERIES_EPISODE_VIDEOS_URL,
} from "@/utils/config/urlConfigs";

type EpisodeDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, "EpisodeDetailsScreen">;
};

const EpisodeDetailsScreen: React.FC<EpisodeDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { payload, id, title, season, episode } = route?.params;
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const { IMAGEURL } = useSelector((state: RootState) => state.movies);

  const [videos, setVideos] = useState<videoType[]>([]);
  const [crews, setCrews] = useState<allMovieType[]>([]);
  const [Images, setImages] = useState<posterType[]>([]);

  let URL = IMAGEURL + payload?.still_path;

  useEffect(() => {
    fetchEpisodeImages();
    fetchEpisodeCrews();
    fetchEpisodeVideos();
  }, []);

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

  const fetchEpisodeVideos = useCallback(async () => {
    const result = await handleAxiosGetRequest(
      GET_TV_SERIES_EPISODE_VIDEOS_URL(id, season, episode)
    );
    if (result?.results) {
      setVideos(result?.results);
    }
  }, []);

  const fetchEpisodeCrews = useCallback(async () => {
    const result = await handleAxiosGetRequest(
      GET_TV_SERIES_EPISODE_CREDITS_URL(id, season, episode)
    );
    if (result?.cast) {
      setCrews(result?.cast);
    }
  }, []);

  const fetchEpisodeImages = useCallback(async () => {
    const result = await handleAxiosGetRequest(
      GET_TV_SERIES_EPISODE_IMAGES_URL(id, season, episode)
    );
    if (result?.stills) {
      setImages(result?.stills);
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme?.background,
        paddingTop: scale(30),
      }}
    >
      <CustomStatusBar />
      <HeaderBack
        title={payload?.name}
        handleClose={() => navigation.goBack()}
        hasMenu={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {
            paddingBottom: scale(90),
            paddingTop: scale(15),
          },
        ]}
      >
        <View style={{ paddingHorizontal: scale(10) }}>
          <Image
            source={URL}
            style={{
              width: "100%",
              height: 250,
              objectFit: "fill",
              borderRadius: 10,
            }}
            placeholder={blurhash}
            contentFit="cover"
            transition={1000}
          />
        </View>
        <Animated.View
          entering={FadeInDown.delay(800)}
          style={{
            paddingVertical: scale(20),
            paddingHorizontal: scale(15),
          }}
        >
          <Text style={[styles.title, { color: theme?.color }]}>
            {payload?.name}
          </Text>
          <Text style={styles.date}>
            {formateDateByName(payload?.air_date)}
          </Text>

          <Text style={[styles.desc, { color: theme?.color }]}>
            {payload?.overview}
          </Text>
        </Animated.View>

        {crews && crews?.length ? (
          <Animated.View
            entering={FadeInDown.delay(1200)}
            style={{
              paddingVertical: scale(0),
            }}
          >
            <View style={{ marginBottom: scale(0), paddingLeft: scale(15) }}>
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
                  key={item?.id}
                  type={"single"}
                  movieType={"actors"}
                />
              ))}
            </ScrollView>
          </Animated.View>
        ) : null}

        {Images && Images?.length ? (
          <Animated.View
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
          </Animated.View>
        ) : null}
      </ScrollView>
      {videos && videos?.length ? (
        <SafeAreaView>
          <View style={{ paddingHorizontal: scale(20) }}>
            <CustomButton
              allCaps={false}
              color="#333"
              onPress={() => {
                showPreviewModal();
              }}
              title="Videos"
              valid={true}
            />
          </View>
        </SafeAreaView>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: scale(22),
    lineHeight: scale(28),
    color: "#fff",
    fontFamily: "PoppinsBold",
    marginBottom: scale(9),
  },
  date: {
    fontSize: scale(14),
    color: colors.PRIMARY.yellow,
    fontFamily: "PoppinsLight",
  },
  desc: {
    fontSize: scale(13.5),
    lineHeight: scale(20),
    color: "#fff",
    marginTop: scale(9),
    fontFamily: "PoppinsLight",
  },
});

export default EpisodeDetailsScreen;
