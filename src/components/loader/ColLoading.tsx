import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import React from "react";

import { scale } from "react-native-size-matters";
import Skeleton from "../custom/skeleton";
import ItemLoading from "./ItemLoading";

const { width } = Dimensions.get("screen");

const ColLoading = ({
  height = 275,
  numbCol = 2,
  onlyOne = false,
  numberOfItem = 4,
  type = "single",
}) => {
  const cardWidth = Dimensions.get("window").width * 0.88;
  const cardWidth2 = Dimensions.get("window").width * 0.91;

  return (
    <View style={{ paddingBottom: scale(0) }}>
      <View style={[{ paddingVertical: scale(20) }]}>
        {onlyOne === false && numbCol === 2 && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "flex-start",
              columnGap: 10,
              paddingHorizontal: scale(10),
            }}
          >
            {Array.from({ length: numberOfItem })?.map((item, index) => (
              <View
                style={[styles.listContainer, { height: scale(height) }]}
                key={index}
              >
                <Skeleton
                  height={height}
                  width={cardWidth}
                  style={{ borderRadius: 3, borderWidth: 0 }}
                />
              </View>
            ))}
          </View>
        )}
        {onlyOne === false &&
          numbCol === 1 &&
          Array.from({ length: numberOfItem })?.map((item, index) => (
            <View key={index}>
              <Skeleton
                height={scale(height)}
                width={cardWidth2}
                style={[
                  styles.listContainer2,
                  { borderRadius: 20, borderWidth: 0 },
                ]}
              />
            </View>
          ))}
        {onlyOne === true && numbCol === 1 && type === "single" && (
          <FlatList
            horizontal
            data={Array.from({ length: 10 })}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <ItemLoading
                height={scale(height)}
                cardWidth2={cardWidth2}
                index={index}
                type={type}
              />
            )}
            contentContainerStyle={{
              paddingRight: scale(0),
            }}
          />
        )}

        {onlyOne === true && numbCol === 1 && type === "banner" && (
          <View style={{ paddingHorizontal: scale(10) }}>
            <Skeleton
              height={scale(height)}
              width={width * scale(0.85)}
              style={[
                styles.listContainer2,
                { borderRadius: 10, borderWidth: 0 },
              ]}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ColLoading;

const styles = StyleSheet.create({
  listContainer: {
    position: "relative",
    width: "48%",
    // height: 275,
    borderRadius: 3,
    marginBottom: scale(8),
    overflow: "hidden",
  },

  listContainer2: {
    marginBottom: scale(30),
    flexDirection: "row",
    borderColor: "#e5e5e5",
    borderWidth: 0.5,
    paddingVertical: scale(15),

    // paddingHorizontal: scale(10),
    borderRadius: 10,
  },

  listContainer3: {
    position: "relative",
    width: width * 0.37,
    height: scale(250),
    borderRadius: 1,
    marginRight: scale(40),
    paddingTop: scale(10),
    paddingBottom: scale(20),
    textAlign: "left",
  },
});
