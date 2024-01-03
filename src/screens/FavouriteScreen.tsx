import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useRef } from "react";
import { scale } from "react-native-size-matters";
import CustomStatusBar from "@/components/custom/CustomStatusBar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ThemeContext from "@/themes/themeContext";
import { useIsFocused } from "@react-navigation/native";
import Header from "@/components/header/Header";
import MovieItem from "@/components/movies/MovieItem";
import NoItem from "@/components/movies/NoItem";
import colors from "@/styles/colors";
import { shuffleArray } from "@/utils/helpers/customFunctions";

const FavouriteScreen = () => {
  const theme = useContext(ThemeContext);
  const flatlistRef = useRef<FlatList>(null);
  const { favourites } = useSelector((state: RootState) => state.movies);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme?.background }}>
      <CustomStatusBar />
      <Header />
      <View style={{ marginTop: scale(7) }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: scale(20),
            paddingLeft: scale(10),
            paddingBottom: scale(10),
          }}
        >
          <Text
            style={[
              {
                color: theme?.color,
                fontSize: scale(15),
                lineHeight: scale(20),
                fontFamily: "PoppinsBold",
              },
              Platform.OS === "android" && {
                borderLeftWidth: 4,
                borderColor: colors.PRIMARY.yellow,
                paddingLeft: scale(10),
              },
            ]}
          >
            FAVOURITES
          </Text>
        </View>
        <FlatList
          ref={flatlistRef}
          data={shuffleArray(favourites)}
          numColumns={2}
          columnWrapperStyle={{
            columnGap: 10,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <MovieItem
              item={item}
              index={index}
              key={index}
              type={"double"}
              movieType={item?.movieType || "movie"}
              spaceMore={true}
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: scale(10),
            marginTop: scale(10),
            paddingBottom: scale(80),
          }}
          ListEmptyComponent={
            <View style={{ flex: 1 }}>
              <NoItem
                icon="movie"
                text={"No Favourite Movie"}
                des={""}
                buttonText=""
                onPress={() => {}}
              />
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({});
