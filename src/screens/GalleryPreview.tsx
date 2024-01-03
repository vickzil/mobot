import {
  Animated,
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import Pagination from "./GalleryPagination";
import { scale } from "react-native-size-matters";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigations/ScreenStack";
import { RouteProp } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ThemeContext from "@/themes/themeContext";
const { width, height } = Dimensions.get("screen");

type GalleryPreviewProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, "GalleryPreview">;
};

const GalleryPreview: React.FC<GalleryPreviewProps> = ({
  navigation,
  route,
}) => {
  const { images } = route?.params;
  const theme = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = React.useRef<FlatList | null>(null);
  const scrollAnimation = React.useRef(new Animated.Value(0)).current;
  const { IMAGEURL } = useSelector((state: RootState) => state.movies);

  const scrollToIndex = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <View style={styles.screen}>
      <View
        style={{
          position: "absolute",
          top: Platform.OS === "android" ? "5%" : "7%",
          width: "100%",
          zIndex: 10000,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: scale(10),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: scale(8),
            }}
          >
            <MaterialCommunityIcons
              name="close-box"
              size={scale(36)}
              style={[{ color: theme?.color, marginRight: 0 }]}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </View>
      </View>

      <Animated.FlatList
        ref={scrollRef}
        data={images}
        bounces={false}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.file_path}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollAnimation } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={(ev) => {
          scrollToIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.item} key={index}>
              <Animated.Image
                source={{ uri: IMAGEURL + item?.file_path }}
                style={[
                  styles.image,
                  {
                    transform: [
                      {
                        translateX: scrollAnimation?.interpolate({
                          inputRange: [
                            width * (index - 1),
                            width * index,
                            width * (index + 1),
                          ],
                          outputRange: [-width * 0.5, 0, width * 0.5],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
          );
        }}
      />

      <Pagination
        items={images}
        scrollAnimation={scrollAnimation}
        scrollRef={scrollRef}
        activeIndex={activeIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
  },
  item: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width,
    height,
  },
  itemOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  image: {
    width,
    height,
    resizeMode: "contain",
  },
  titleContainer: {
    position: "absolute",
    bottom: 140,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    color: "#fff",
  },
});

export default GalleryPreview;
