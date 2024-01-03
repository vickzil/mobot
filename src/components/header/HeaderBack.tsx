import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ThemeContext from "@/themes/themeContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "@/navigations";

const HeaderBack = ({
  icon = "chevron-back-sharp",
  title = "",
  hasMenu = false,
  isUpperCase = false,
  handleClose = () => {},
}) => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const theme = useContext(ThemeContext);
  const { darkMode } = useSelector((state: RootState) => state.oauth);

  const gradientColor = darkMode
    ? ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "transparent"]
    : ["#ffffff", "#ffffff"];

  return (
    <View
      style={[
        styles.headerContainer,
        { borderBottomWidth: 1, borderColor: darkMode ? "#444" : "#e8e6ea" },
      ]}
    >
      <LinearGradient colors={gradientColor} style={styles.linearGradient}>
        <TouchableOpacity onPress={() => handleClose()}>
          <Ionicons name={icon} size={scale(28)} color={theme?.color} />
        </TouchableOpacity>
        <View style={{ marginLeft: scale(-20) }}>
          <Text
            numberOfLines={1}
            style={[
              styles.headerText,
              { color: theme?.color, width: scale(244) },
              isUpperCase && { textTransform: "uppercase" },
            ]}
          >
            {title}
          </Text>
        </View>
        {hasMenu ? (
          <TouchableOpacity
            onPress={() => navigation?.openDrawer()}
            style={[styles.headerIcon, { borderColor: theme?.color }]}
          >
            <Ionicons name={"reorder-three"} size={28} color={theme?.color} />
          </TouchableOpacity>
        ) : (
          <Text></Text>
        )}
      </LinearGradient>
    </View>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: scale(3),
  },
  linearGradient: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: scale(40),
    width: "100%",
    paddingHorizontal: scale(10),
  },

  headerText: {
    fontSize: scale(18),
    lineHeight: scale(28),
    fontFamily: "PoppinsBold",
    textTransform: "capitalize",
  },

  headerIcon: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: scale(4),
  },
});
