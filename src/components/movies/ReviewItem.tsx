import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { scale } from "react-native-size-matters";
import { reviewType } from "@/types/movieType";
import { Image } from "expo-image";
import { blurhash, formateDateByName } from "@/utils/helpers/customFunctions";
import ThemeContext from "@/themes/themeContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import colors from "@/styles/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigations/ScreenStack";

const { width } = Dimensions.get("screen");

type ReviewItemProp = {
  item: reviewType;
  index: number;
};

const ReviewItem: React.FC<ReviewItemProp> = ({ item, index }) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { darkMode } = useSelector((state: RootState) => state.oauth);
  const { IMAGEURL } = useSelector((state: RootState) => state.movies);

  let URL = IMAGEURL + item?.author_details?.avatar_path;

  if (item?.content?.length < 50) {
    return;
  }

  return (
    <View
      style={[
        styles.reviewBox,
        darkMode && {
          backgroundColor: "#222",
          borderColor: "#444",
        },
      ]}
      key={index}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 15,
          }}
        >
          <Image
            source={URL}
            style={{
              width: scale(30),
              height: scale(30),
              borderRadius: 50,
            }}
            placeholder={blurhash}
            contentFit="cover"
            transition={1000}
          />

          <View>
            <Text
              style={[
                darkMode && { color: "#fff" },
                {
                  fontWeight: "600",
                  fontSize: scale(12),
                  fontFamily: "PoppinsMedium",
                },
              ]}
            >
              {item?.author}
            </Text>

            <Text
              style={[
                {
                  color: darkMode ? "#fff" : "#5D626D",
                  marginTop: scale(0),
                  fontSize: scale(10),
                  fontFamily: "PoppinsLight",
                },
              ]}
            >
              {formateDateByName(item?.created_at)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: scale(3),
          }}
        >
          <Ionicons
            name="star"
            size={scale(13)}
            style={[
              {
                color: colors.PRIMARY.orangeColor,
                marginTop: scale(-2),
                marginRight: scale(2),
              },
            ]}
          />
          <Text
            style={[
              {
                color: darkMode ? "#fff" : "#5D626D",

                lineHeight: scale(18),
                fontSize: scale(12),
                fontFamily: "PoppinsLight",
              },
            ]}
          >
            {item?.author_details?.rating}.0
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: scale(15),
        }}
      >
        <Text
          numberOfLines={6}
          style={[
            {
              color: darkMode ? "#fff" : "#5D626D",

              lineHeight: scale(18),
              fontSize: scale(12),
              fontFamily: "PoppinsLight",
            },
          ]}
        >
          {item?.content}
        </Text>
        {/* {item?.content?.length > 100 ? (
          <TouchableOpacity
            style={{
              width: "100%",
              marginTop: scale(4),
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={[
                {
                  color: colors.PRIMARY.orangeColor,

                  lineHeight: scale(18),
                  fontSize: scale(14),
                  fontFamily: "PoppinsLight",
                },
              ]}
            >
              See all
            </Text>
          </TouchableOpacity>
        ) : null} */}
      </View>
    </View>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  reviewBox: {
    position: "relative",
    width: width * 0.79,
    borderRadius: scale(8),
    marginRight: scale(12),
    backgroundColor: "#fff",
    paddingHorizontal: scale(16),
    paddingTop: scale(15),
    paddingBottom: scale(20),
    textAlign: "left",
    borderWidth: 1,
    borderColor: "#CBD0DA",
  },
});
