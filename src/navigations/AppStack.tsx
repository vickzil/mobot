import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/screens/HomeScreen";
import SearchScreen from "@/screens/SearchScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import FavouriteScreen from "@/screens/FavouriteScreen";
import colors from "@/styles/colors";
import { scale } from "react-native-size-matters";
import ThemeContext from "@/themes/themeContext";
import { Platform } from "react-native";

export type RootBottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Favourites: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

const AppStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.PRIMARY.yellow,
        tabBarInactiveTintColor: "#888",

        tabBarLabelStyle: {
          fontSize: scale(12),
          fontFamily: "Poppins",

          paddingBottom: 0,
        },
        tabBarStyle: {
          height: Platform.OS === "ios" ? scale(80) : scale(51),
          backgroundColor: theme?.background,
        },
        tabBarAllowFontScaling: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"home"} size={scale(22)} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"search"} size={scale(22)} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouriteScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"heart"} size={scale(22)} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"cog"} size={scale(22)} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
