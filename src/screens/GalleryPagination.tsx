import { RootState } from "@/store/store";
import colors from "@/styles/colors";
import { posterType } from "@/types/movieType";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";
import { scale } from "react-native-size-matters";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const itemSize = scale(60);
const activeItemSize = itemSize + scale(12);
const itemSpacing = scale(8);

type GalleryPaginationProps = {
  items: posterType[];
  scrollAnimation: any;
  scrollRef: React.MutableRefObject<FlatList<any> | null>;
  activeIndex: number;
};
const GalleryPagination: React.FC<GalleryPaginationProps> = ({
  items,
  scrollAnimation,
  scrollRef,
  activeIndex,
}) => {
  const dataRef = useRef<ScrollView | null>(null);
  const { IMAGEURL } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (activeIndex) {
      handleScrollIndex(activeIndex);
    }
  }, [activeIndex]);

  const handleScrollIndex = (index: number) => {
    dataRef.current?.scrollTo({
      animated: true,
      x: index * (itemSize + itemSpacing) - width / 2 + itemSize / 2,
      y: 0,
    });
  };

  return (
    <View style={styles.pagination}>
      <ScrollView
        ref={dataRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={styles.paginationInner}>
          <Animated.View
            style={[
              styles.activeItem,
              {
                transform: [
                  {
                    translateX: scrollAnimation.interpolate({
                      inputRange: items.map((_, i) => width * i),
                      outputRange: items.map(
                        (_, i) => i * (itemSize + itemSpacing)
                      ),
                    }),
                  },
                ],
              },
            ]}
          />
          {items.map(({ file_path }, index) => (
            <Pressable
              key={file_path}
              onPress={() => {
                scrollRef?.current?.scrollToOffset({
                  animated: true,
                  offset: width * index,
                });

                if (
                  index * (itemSize + itemSpacing) - itemSize / 2 >
                  width / 2
                ) {
                  handleScrollIndex(index);
                }
              }}
            >
              <View style={[{ marginRight: itemSpacing }]}>
                <Animated.Image
                  source={{ uri: IMAGEURL + file_path }}
                  style={{
                    width: itemSize,
                    height: itemSize,
                    borderRadius: itemSize,
                  }}
                />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    position: "absolute",
    alignItems: "center",
    width,
    height: scale(80),
    bottom: Platform.OS === "android" ? scale(40) : scale(70),
  },
  paginationInner: {
    flexDirection: "row",
    marginTop: scale(10),
    marginLeft: scale(10),
  },
  item: {
    width: itemSize,
    height: itemSize,
    backgroundColor: "#fff",
    borderRadius: itemSize,
    marginRight: itemSpacing,
  },
  lastItem: {
    marginRight: 0,
  },
  activeItem: {
    position: "absolute",
    left: (itemSize - activeItemSize) / 2,
    top: (itemSize - activeItemSize) / 2,
    width: activeItemSize,
    height: activeItemSize,
    borderRadius: activeItemSize,
    borderWidth: 2,
    borderColor: colors.PRIMARY.yellow,
    zIndex: 1000,
  },
});

export default GalleryPagination;
