import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ThemeContext from "@/themes/themeContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale } from "react-native-size-matters";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigations/ScreenStack";
import Logo from "../custom/Logo";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // const navigation2 =
  //   useNavigation<BottomTabNavigationProp<RootBottomTabParamList>>();
  const theme = useContext(ThemeContext);
  const { darkMode } = useSelector((state: RootState) => state.oauth);

  const gradientColor = darkMode
    ? [
        "rgba(0, 0, 0, 0.9)",
        "rgba(0, 0, 0, 0.7)",
        "rgba(0, 0, 0, 0.5)",
        "rgba(0, 0, 0, 0.3)",
        "rgba(0, 0, 0, 0.1)",
        "transparent",
      ]
    : [
        "rgba(255, 255, 255, 0.9)",
        "rgba(255, 255, 255, 0.7)",
        "rgba(255, 255, 255, 0.5)",
        "rgba(255, 255, 255, 0.3)",
        "rgba(255, 255, 255, 0.1)",
        "transparent",
      ];

  return (
    <LinearGradient
      colors={gradientColor}
      style={[
        styles.linearGradient,
        !darkMode && {
          borderBottomWidth: 1,
          borderColor: "#ced4ed",
          paddingBottom: scale(10),
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AppStack");
        }}
      >
        <Logo />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={[styles.headerIcon, { borderColor: theme?.color }]}
      >
        <Ionicons
          name={"reorder-three"}
          size={scale(25)}
          color={theme?.color}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  linearGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: scale(45),
    width: "100%",
    paddingHorizontal: scale(20),
  },

  headerIcon: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: scale(4),
  },
});
