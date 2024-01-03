import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { scale } from "react-native-size-matters";
import colors from "@/styles/colors";
import ThemeContext from "@/themes/themeContext";

const Logo = () => {
  const theme = useContext(ThemeContext);

  return (
    <View style={styles.headerLogo}>
      <Text style={[styles.headerText, { color: theme?.color }]}>MO</Text>
      <Text
        style={[
          styles.headerText,
          { color: colors.PRIMARY.yellow, marginLeft: scale(-4) },
        ]}
      >
        BOT
      </Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  headerLogo: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },

  headerText: {
    fontSize: scale(22),
    fontFamily: "Poppins",
  },
});
