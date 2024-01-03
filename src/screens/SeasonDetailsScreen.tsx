import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useContext } from "react";
import { scale } from "react-native-size-matters";
import CustomStatusBar from "@/components/custom/CustomStatusBar";
import ThemeContext from "@/themes/themeContext";
import HeaderBack from "@/components/header/HeaderBack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "@/navigations/ScreenStack";
import SeasonListItem from "@/components/movies/SeasonListItem";
import DescriptionList from "@/components/movies/DescriptionList";
import { formateDateByName } from "@/utils/helpers/customFunctions";
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";

type SeasonDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, "SeasonDetailsScreen">;
};

const SeasonDetailsScreen = ({
  navigation,
  route,
}: SeasonDetailsScreenProps) => {
  const { payload, id, title, seriesID } = route?.params;
  const theme = useContext(ThemeContext);

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
        <View style={{ marginBottom: scale(10) }}>
          <Animated.View
            entering={FadeInLeft.delay(200)}
            style={{
              paddingVertical: scale(10),
              paddingHorizontal: scale(15),
            }}
          >
            {payload?.episodes?.length ? (
              <DescriptionList
                title="Number of episode"
                description={payload?.episodes?.length}
              />
            ) : null}
            {payload?.air_date ? (
              <DescriptionList
                title="Air Date"
                description={formateDateByName(payload?.air_date)}
              />
            ) : null}
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200)}
            style={{
              paddingVertical: scale(10),
              paddingHorizontal: scale(15),
            }}
          >
            <View style={{ marginBottom: scale(5) }}>
              <Text
                style={{
                  fontSize: scale(13),
                  color: "#888",
                  fontFamily: "PoppinsLight",
                }}
              >
                Episodes
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-start",
                columnGap: 15,
              }}
            >
              {payload?.episodes?.map((item, index) => (
                <SeasonListItem
                  item={item}
                  index={index}
                  key={item?.id}
                  seasonNumber={payload?.season_number}
                  seriesID={seriesID}
                />
              ))}
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeasonDetailsScreen;
