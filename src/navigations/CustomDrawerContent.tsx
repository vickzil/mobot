import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { scale } from "react-native-size-matters";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../themes/themeContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./ScreenStack";
import { DrawerActions } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Logo from "@/components/custom/Logo";

const CustomDrawerContent = () => {
  const theme = useContext(ThemeContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { genres } = useSelector((state: RootState) => state.movies);

  const navigateToScreen = (id: string, value: string) => {
    navigation.dispatch(DrawerActions.closeDrawer());
    setTimeout(() => {
      navigation.navigate("MovieCategoryScreen", {
        item: value,
        id: id,
        payload: [],
      });
    }, 100);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme?.background,
      }}
    >
      <View
        style={{
          paddingTop: Platform.OS === "android" ? scale(10) : scale(60),
        }}
      >
        <View style={styles.containerHeader}>
          <Logo />
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
            style={{
              backgroundColor: "#808080",
              borderRadius: 50,
              alignSelf: "flex-start",
              paddingVertical: scale(5),
              paddingHorizontal: scale(5),
            }}
          >
            <AntDesign
              name="close"
              size={scale(20)}
              color={"#fff"}
              style={[
                {
                  fontWeight: "800",
                },
              ]}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View
            style={{
              marginTop: scale(30),
              alignItems: "flex-start",
              justifyContent: "flex-start",
              paddingBottom: scale(90),
              paddingLeft: scale(18),
            }}
          >
            {genres &&
              genres?.map((genre, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.linkNav}
                  onPress={() =>
                    navigateToScreen(genre?.id.toString(), genre?.name)
                  }
                >
                  <Text
                    style={[
                      styles.textName,
                      { color: theme?.color2, textTransform: "uppercase" },
                    ]}
                  >
                    {genre?.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",

    gap: scale(20),
    paddingHorizontal: scale(15),
    paddingBottom: scale(5),
  },
  linkNav: {
    marginBottom: scale(20),
  },

  textName: {
    fontSize: scale(15),
    lineHeight: scale(20),
    fontFamily: "PoppinsMedium",
    textAlign: "left",
  },

  textDes: {
    color: "#555a64",
    fontSize: scale(11),
    fontFamily: "Poppins",
    marginTop: scale(5),
  },
  containerItem: {
    marginHorizontal: scale(15),
    marginTop: scale(0),
  },
});
