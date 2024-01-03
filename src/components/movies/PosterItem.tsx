import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { scale } from "react-native-size-matters";
import { posterType } from "@/types/movieType";
import { Image } from "expo-image";
import { blurhash } from "@/utils/helpers/customFunctions";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigations/ScreenStack";

type PosterItemProp = {
  item: posterType;
  index: number;
  images: posterType[];
};

const PosterItem: React.FC<PosterItemProp> = ({ item, index, images }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { IMAGEURL } = useSelector((state: RootState) => state.movies);

  let URL = IMAGEURL + item?.file_path;

  const handlePreviewImages = useCallback(async () => {
    let allData = images;

    let catData = allData?.filter(
      (image) => image?.file_path !== item?.file_path
    );
    let newData = [item, ...catData];

    navigation.navigate("GalleryPreview", {
      images: newData,
    });
  }, []);

  return (
    <View style={[styles.listContainer]}>
      <TouchableOpacity onPress={() => handlePreviewImages()}>
        <Image
          source={URL}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
          }}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PosterItem;

const styles = StyleSheet.create({
  listContainer: {
    position: "relative",
    width: "32%",
    height: scale(145),
    borderRadius: 2,
    marginBottom: scale(5),
    overflow: "hidden",
  },
});
