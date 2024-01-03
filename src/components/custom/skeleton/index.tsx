import { StyleSheet, View, Animated, StyleProp, ViewStyle } from "react-native";
import React, { useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type SkeletonProps = {
  width: number;
  height: number;
  style: StyleProp<ViewStyle>;
};
const Skeleton = ({ width, height, style }: SkeletonProps) => {
  const { darkMode } = useSelector((state: RootState) => state.oauth);
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      })
    ).start();
  }, [width]);

  return (
    <View
      style={StyleSheet.flatten([
        style,
        {
          width: width,
          height: height,
          backgroundColor: darkMode ? "#666" : "#E6E9EF",
          overflow: "hidden",
        },
      ])}
    >
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          transform: [{ translateX: translateX }],
        }}
      >
        <LinearGradient
          style={{ width: "100%", height: "100%" }}
          colors={["transparent", "rgba(0, 0, 0, 0.05)", "transparent"]}
          start={{ x: 1, y: 1 }}
        ></LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Skeleton;
