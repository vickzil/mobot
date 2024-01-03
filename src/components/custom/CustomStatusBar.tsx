import { StatusBar } from "react-native";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ThemeContext from "@/themes/themeContext";

const CustomStatusBar = () => {
  const theme = useContext(ThemeContext);
  const { darkMode } = useSelector((state: RootState) => state.oauth);

  return (
    <StatusBar
      backgroundColor={theme?.background}
      barStyle={darkMode ? "light-content" : "dark-content"}
    />
  );
};

export default CustomStatusBar;
