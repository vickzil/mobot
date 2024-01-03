import React, { useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ScreenStack from "./ScreenStack";
import CustomDrawerContent from "./CustomDrawerContent";
import ThemeContext from "@/themes/themeContext";
import Theme from "@/themes/themes";
import * as SplashScreen from "expo-splash-screen";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import PageLoading from "@/components/loader/PageLoading";

import {
  getActors,
  getAllMovies,
  getGenres,
  getTrendingMovies,
  getTvSeries,
  getUpcomingMovies,
} from "@/store/movieSlice/actions";
import { setFavourites } from "@/store/movieSlice/movieSlice";
import { scale } from "react-native-size-matters";
import axiosInstance from "@/utils/config/axios";
import { ACCESSTOKEN, GET_AUTHENTICATION_URL } from "@/utils/config/urlConfigs";

SplashScreen.preventAutoHideAsync();

export type RootDrawerParamList = {
  HomeStack: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const MainNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [appIsReady, setAppIsReady] = useState(false);
  const { darkMode } = useSelector((state: RootState) => state.oauth);

  useLayoutEffect(() => {
    (async () => {
      try {
        const result = await axiosInstance
          .get(GET_AUTHENTICATION_URL, {
            headers: {
              Authorization: "Bearer " + ACCESSTOKEN,
            },
          })
          .then((response) => {
            return response.data;
          });

        if (result) {
          dispatch(getGenres());
          dispatch(getUpcomingMovies());
          dispatch(getTrendingMovies());
          dispatch(getActors());
          dispatch(getTvSeries());
          dispatch(getAllMovies());

          getFavourites();
        }

        setTimeout(() => {
          setAppIsReady(true);
        }, 1000);

        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 1200);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const getFavourites = async () => {
    const allFavourites = await AsyncStorage.getItem("favourites");
    if (allFavourites) {
      dispatch(setFavourites(JSON.parse(allFavourites)));
    }
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeContext.Provider value={darkMode ? Theme.dark : Theme.light}>
      <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              width: scale(240),
            },
          }}
          drawerContent={(props) => <CustomDrawerContent />}
        >
          <Drawer.Screen name="HomeStack" component={ScreenStack} />
        </Drawer.Navigator>

        <PageLoading />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default MainNavigation;
