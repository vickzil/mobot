import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import Skeleton from "../custom/skeleton";

type movieItemProps = {
  index: number;
  height: number;
  cardWidth2: number;
  type: string;
};

const { width } = Dimensions.get("screen");

const ItemLoading = ({ height, index }: movieItemProps) => {
  return (
    <View
      style={[index === 0 && { marginLeft: scale(15) }, styles.card]}
      key={index}
    >
      <Skeleton
        height={scale(height)}
        width={width * 0.37}
        style={[{ borderRadius: 2 }]}
      />
    </View>
  );
};

export default ItemLoading;

const styles = StyleSheet.create({
  card: {
    position: "relative",
    width: width * 0.37,
    height: 250,
    borderRadius: 1,
    marginRight: scale(10),
    paddingTop: scale(10),
    paddingBottom: scale(20),
    textAlign: "left",
  },
});
