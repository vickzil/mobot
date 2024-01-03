import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStack from "./AppStack";
import MovieDetailsScreen from "@/screens/MovieDetailsScreen";
import MovieCategoryScreen from "@/screens/MovieCategoryScreen";
import MoviePlayer from "@/screens/MoviePlayer";
import ToastModal from "@/modal/ToastModal";
import {
  allMovieType,
  episodeType,
  posterType,
  seasonsDetailsType,
  singleMovieType,
  videoType,
} from "@/types/movieType";
import SeasonDetailsScreen from "@/screens/SeasonDetailsScreen";
import EpisodeDetailsScreen from "@/screens/EpisodeDetailsScreen";
import GalleryPreview from "@/screens/GalleryPreview";
import About from "@/screens/About";

export type RootStackParamList = {
  AppStack: undefined;
  MovieDetailsScreen: {
    movieID: string;
    item: singleMovieType;
    movieType: string;
  };
  MovieCategoryScreen: { item: string; id: string; payload: allMovieType[] };
  SeasonDetailsScreen: {
    id: string;
    title: string;
    seriesID: number;
    payload: seasonsDetailsType;
  };
  EpisodeDetailsScreen: {
    id: number;
    season: number;
    episode: number;
    title: string;
    payload: episodeType;
  };
  GalleryPreview: {
    images: posterType[];
  };
  MoviePlayer: { movieID: string; item: videoType[] };
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const ScreenStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: "Poppins",
          },
        }}
        initialRouteName={"AppStack"}
      >
        <Stack.Group>
          <Stack.Screen
            options={{ headerShown: false, animation: "slide_from_right" }}
            name="AppStack"
            component={AppStack}
          />
          <Stack.Screen
            getId={({ params }) => params?.movieID}
            options={{ headerShown: false, animation: "slide_from_right" }}
            name="MovieDetailsScreen"
            component={MovieDetailsScreen}
          />
          <Stack.Screen
            options={{ headerShown: false, animation: "slide_from_right" }}
            name="MovieCategoryScreen"
            component={MovieCategoryScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
            name="SeasonDetailsScreen"
            component={SeasonDetailsScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
            name="EpisodeDetailsScreen"
            component={EpisodeDetailsScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
            name="GalleryPreview"
            component={GalleryPreview}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              animation: "fade_from_bottom",
            }}
            name="MoviePlayer"
            component={MoviePlayer}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              animation: "fade_from_bottom",
            }}
            name="About"
            component={About}
          />
        </Stack.Group>
      </Stack.Navigator>
      <ToastModal />
    </>
  );
};

export default ScreenStack;
