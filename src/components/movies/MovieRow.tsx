import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import ThemeContext from "@/themes/themeContext";
import { scale } from "react-native-size-matters";
import { allMovieType } from "@/types/movieType";
import MovieItem from "./MovieItem";
import ColLoading from "../loader/ColLoading";
import NoItem from "./NoItem";
import SessionTitle from "../custom/SessionTitle";

type movieRowProps = {
  movies: allMovieType[];
  title: string;
  rightTitle?: string;
  type: string;
  movieType: string;
  hasInfiniteScroll: boolean;
  isLoading: boolean;
  isUser: boolean;
  handleClick: () => void;
};

const MovieRow = ({
  movies,
  title,
  rightTitle,
  type,
  isLoading,
  movieType,
  handleClick,
}: movieRowProps) => {
  const theme = useContext(ThemeContext);

  const NoMovies = () => {
    return (
      <View style={{ flex: 1 }}>
        <NoItem
          icon="movie"
          text={"No Movies"}
          des={""}
          buttonText=""
          onPress={() => {}}
        />
      </View>
    );
  };

  return (
    <View
      style={{ width: "100%", paddingTop: scale(20), marginBottom: scale(0) }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: scale(10),
        }}
      >
        {title && <SessionTitle title={title} />}

        {rightTitle && !isLoading && (
          <TouchableOpacity onPress={() => handleClick()}>
            <Text
              style={{
                color: theme?.color,
                fontSize: scale(13),
                lineHeight: scale(20),
                fontFamily: "PoppinsBold",
              }}
            >
              {rightTitle}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {type === "single" ? (
        <>
          {isLoading ? (
            <View
              style={{
                paddingBottom: scale(10),
                marginTop: 0,
                width: "100%",
              }}
            >
              <ColLoading height={250} numbCol={1} onlyOne={true} />
            </View>
          ) : movies && movies?.length ? (
            <ScrollView
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingRight: scale(18),
              }}
            >
              {movies?.map((item, index) => (
                <MovieItem
                  item={item}
                  index={index}
                  key={index}
                  type={type}
                  movieType={movieType}
                />
              ))}
            </ScrollView>
          ) : (
            <NoMovies />
          )}
        </>
      ) : (
        <>
          {isLoading ? (
            <View
              style={{
                paddingBottom: scale(10),
                marginTop: 0,
                width: "100%",
              }}
            >
              <ColLoading height={250} numbCol={2} onlyOne={false} />
            </View>
          ) : movies && movies?.length ? (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-start",
                columnGap: 10,
                paddingLeft: scale(10),
              }}
            >
              {movies?.map((item, index) => (
                <MovieItem
                  item={item}
                  index={index}
                  key={index}
                  type={type}
                  movieType={movieType}
                />
              ))}
            </View>
          ) : (
            <NoMovies />
          )}
        </>
      )}
    </View>
  );
};

export default MovieRow;

const styles = StyleSheet.create({});
