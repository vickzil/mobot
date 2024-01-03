import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useContext } from "react";
import { scale } from "react-native-size-matters";
import { episodeType } from "@/types/movieType";
import { Image } from "expo-image";
import { blurhash } from "@/utils/helpers/customFunctions";
import ThemeContext from "@/themes/themeContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import colors from "@/styles/colors";
import { setLoadingModal, setToastModal } from "@/store/alertSlice/alertSlice";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigations/ScreenStack";
import { handleAxiosGetRequest } from "@/utils/helpers/httpRequest";
import { GET_TV_SERIES_EPISODE_DETAILS_URL } from "@/utils/config/urlConfigs";

type SeasonListItemProp = {
  item: episodeType;
  index: number;
  seasonNumber: number;
  seriesID: number;
};

const SeasonListItem: React.FC<SeasonListItemProp> = ({
  item,
  seasonNumber,
  seriesID,
}) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { IMAGEURL } = useSelector((state: RootState) => state.movies);

  let URL = IMAGEURL + item?.poster_path;

  const handleFetchSeasonDetails = useCallback(
    async (id: number, seasonNumber: number, episode: number) => {
      dispatch(
        setLoadingModal({
          status: true,
          message: "Please wait ...",
        })
      );

      const URL = GET_TV_SERIES_EPISODE_DETAILS_URL(id, seasonNumber, episode);
      const result = await handleAxiosGetRequest(URL);

      if (result) {
        navigation.navigate("EpisodeDetailsScreen", {
          payload: result,
          id: id,
          season: seasonNumber,
          episode: episode,
          title: "",
        });
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
    },
    []
  );

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme?.background2 }]}
      onPress={() =>
        handleFetchSeasonDetails(seriesID, seasonNumber, item?.episode_number)
      }
    >
      <Image
        source={URL}
        style={{
          width: "100%",
          height: 150,
          objectFit: "fill",
          borderRadius: 10,
        }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />

      <Text
        style={{
          fontSize: scale(14),
          color: colors.PRIMARY.yellow,
          fontFamily: "PoppinsBold",
          textAlign: "center",
          marginTop: scale(10),
        }}
      >
        Episode {item?.episode_number}
      </Text>
      <Text
        style={{
          fontSize: scale(11.5),
          color: theme?.color,
          fontFamily: "Poppins",
          textAlign: "center",
          marginTop: scale(0),
        }}
      >
        {item?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default SeasonListItem;

const styles = StyleSheet.create({
  card: {
    position: "relative",
    width: "47%",
    // height: 270,
    borderRadius: 10,
    marginBottom: scale(14),
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
  },
});
