import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { scale } from "react-native-size-matters";
import ThemeContext from "@/themes/themeContext";
import CustomStatusBar from "@/components/custom/CustomStatusBar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import HeaderBack from "@/components/header/HeaderBack";
import MoviePlayerItem from "@/components/movies/MoviePlayerItem";
import { videoType } from "@/types/movieType";
import { shuffleArray } from "@/utils/helpers/customFunctions";
import { RootStackParamList } from "@/navigations/ScreenStack";

type MoviePlayerProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<RootStackParamList, "MoviePlayer">;
};

const MoviePlayer = ({ navigation, route }: MoviePlayerProps) => {
  const { item } = route?.params;
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme?.background }]}
    >
      <CustomStatusBar />
      <HeaderBack title={"Videos"} handleClose={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {
            paddingBottom: scale(90),
          },
        ]}
      >
        <View style={{ paddingTop: scale(19) }}>
          {item && item?.length
            ? shuffleArray(item)
                ?.slice(0, 4)
                ?.map((video: videoType, index: number) => (
                  <MoviePlayerItem key={index} video={video} index={index} />
                ))
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoviePlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",

    paddingTop: scale(0),
  },
});
