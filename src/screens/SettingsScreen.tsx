import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { scale } from "react-native-size-matters";
import CustomStatusBar from "@/components/custom/CustomStatusBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setDarkMode } from "@/store/authslice/authSlice";
import ThemeContext from "@/themes/themeContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Header from "@/components/header/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigations/ScreenStack";

const SettingsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useContext(ThemeContext);
  const { darkMode } = useSelector((state: RootState) => state.oauth);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scrollViewRef = useRef<ScrollView>(null);
  const isFocused = useIsFocused();

  const handleToggleTheme = (value: boolean) => {
    dispatch(setDarkMode(value));
  };

  useEffect(() => {
    return () => {
      scrollViewRef?.current?.scrollTo({ x: 0, y: 0, animated: false });
    };
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme?.background }}>
      <CustomStatusBar />
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        contentContainerStyle={[
          {
            paddingTop: scale(20),
            paddingBottom: scale(100),
            paddingHorizontal: scale(20),
          },
        ]}
      >
        <View style={styles.menuWrapper}>
          <Text style={[styles.menuHeading, { color: theme?.color5 }]}>
            Settings
          </Text>

          <TouchableOpacity
            style={styles.menuLinks}
            onPress={() => {
              navigation.navigate("About");
            }}
          >
            <Text style={[styles.menuLinkText, { color: theme?.color }]}>
              About Mobot movies
            </Text>

            <Ionicons
              name="chevron-forward"
              color={theme?.color}
              size={scale(30)}
            />
          </TouchableOpacity>
          <View style={styles.menuLinks}>
            <Text style={[styles.menuLinkText, { color: theme?.color }]}>
              Dark mode
            </Text>
            <Switch
              trackColor={{
                false: "#767577",
                true: darkMode ? "#fff" : "#3e3e3e",
              }}
              thumbColor={darkMode ? "green" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                handleToggleTheme(!darkMode);
              }}
              value={darkMode ? true : false}
              style={{
                transform: [{ scaleX: scale(1) }, { scaleY: scale(1) }],
                marginBottom: scale(0),
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  menuWrapper: {
    marginBottom: scale(10),
  },

  menuHeading: {
    fontWeight: "400",
    fontSize: scale(14),
    fontFamily: "PoppinsMedium",
    lineHeight: scale(24),
    marginBottom: scale(18),
  },

  menuLinks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: scale(19),
  },

  menuLinkText: {
    fontWeight: "400",
    fontSize: scale(13.5),
    fontFamily: "PoppinsMedium",
    lineHeight: scale(24),
  },
});
