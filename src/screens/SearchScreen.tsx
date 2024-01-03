import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { scale } from "react-native-size-matters";
import CustomStatusBar from "@/components/custom/CustomStatusBar";
import ThemeContext from "@/themes/themeContext";
import Header from "@/components/header/Header";
import MovieItem from "@/components/movies/MovieItem";
import { useIsFocused } from "@react-navigation/native";
import NoItem from "@/components/movies/NoItem";
import { removeDuplicateId } from "@/utils/helpers/customFunctions";
import { handleAxiosGetRequest } from "@/utils/helpers/httpRequest";
import { useDebouncedCallback } from "use-debounce";
import ColLoading from "@/components/loader/ColLoading";
import { allMovieType } from "@/types/movieType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SessionTitle from "@/components/custom/SessionTitle";
import SearchInput from "@/components/custom/SearchInput";
import { GET_SEARCH_URL } from "@/utils/config/urlConfigs";

const SearchScreen = () => {
  const theme = useContext(ThemeContext);

  const [searchText, setsearchText] = useState("");
  const [searchResult, setSearchResult] = useState<allMovieType[]>([]);
  const [recentSearch, setRecentSearch] = useState<allMovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const flatlistRef = useRef<FlatList>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchRecentSearch();

    return () => {
      setsearchText("");
      setSearchResult([]);
    };
  }, [isFocused]);

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setIsLoading(true);
      fetchData(currentPage);
    },
    // delay in ms
    1200
  );

  useEffect(() => {
    if (searchText && searchText.length > 2) {
      debounced(searchText);
    }
  }, [searchText]);

  const fetchData = (page: number) => {
    if (searchText?.length <= 0) {
      setIsContentLoading(false);
      setIsLoading(false);
      return;
    }
    setIsContentLoading(true);
    let URL = GET_SEARCH_URL(searchText, page);
    handleAxiosGetRequest(URL)
      .then((response) => {
        if (response?.results) {
          setSearchResult(response?.results);
          setRecentSearch(response?.results);
          AsyncStorage.setItem(
            "recentSearch",
            JSON.stringify(response?.results)
          );
        }

        setCurrentPage(response?.page);
        setTotalPages(response?.total_results);
        setIsContentLoading(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchNextPage = () => {
    if (flatlistRef?.current == null) {
      // End of data.
      return;
    }

    if (isContentLoading === true) {
      return;
    }

    if (currentPage === totalPages) {
      return;
    }

    if (searchResult?.length <= 0) {
      return;
    }

    let newCurrentPage = currentPage + 1;
    setCurrentPage(newCurrentPage);

    fetchMoreData(newCurrentPage);
  };

  const fetchMoreData = (page: number) => {
    setIsContentLoading(true);
    let URL = GET_SEARCH_URL(searchText, page);
    handleAxiosGetRequest(URL)
      .then((response) => {
        if (response?.results) {
          let searchResponse: allMovieType[] = removeDuplicateId([
            ...searchResult,
            ...response?.results,
          ]);
          setSearchResult(searchResponse);
        }

        setCurrentPage(response?.page);
        setTotalPages(response?.total_results);
        setIsContentLoading(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRecentSearch = useCallback(async () => {
    let recentSearch = await AsyncStorage.getItem("recentSearch");

    if (recentSearch) {
      setRecentSearch(JSON.parse(recentSearch)?.slice(0, 10));
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme?.background }}>
      <CustomStatusBar />
      <Header />

      <SearchInput searchText={searchText} setsearchText={setsearchText} />

      {searchResult?.length || recentSearch?.length ? (
        <View
          style={{
            paddingLeft: scale(12),
            marginVertical: scale(10),
            marginBottom: scale(3),
          }}
        >
          <SessionTitle
            title={
              searchResult?.length <= 0 && recentSearch?.length > 0
                ? "Recent Search"
                : "Search Result"
            }
            fontSize={16}
          />
        </View>
      ) : null}

      {isLoading ? (
        <View
          style={{
            paddingBottom: scale(10),
            marginTop: 0,
            width: "100%",
          }}
        >
          <ColLoading
            height={250}
            numbCol={2}
            onlyOne={false}
            numberOfItem={8}
          />
        </View>
      ) : (
        <FlatList
          ref={flatlistRef}
          data={
            searchResult?.length
              ? searchResult?.filter((newItem) => newItem?.poster_path !== null)
              : recentSearch?.filter((newItem) => newItem?.poster_path !== null)
          }
          numColumns={2}
          columnWrapperStyle={{
            columnGap: 10,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <MovieItem
              item={item}
              index={index}
              key={index}
              type={"double"}
              movieType="movie"
              spaceMore={true}
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: scale(10),
            marginTop: scale(10),
            paddingBottom: scale(40),
          }}
          ListEmptyComponent={
            <View style={{ flex: 1 }}>
              <NoItem
                icon="movie"
                text={
                  searchText ? "No Movie found" : "Type to search for any movie"
                }
                des={""}
                buttonText=""
                onPress={() => {}}
              />
            </View>
          }
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.8}
          ListFooterComponent={
            <View style={{ marginTop: scale(10) }}>
              {isContentLoading && (
                <ActivityIndicator size="large" color={theme?.color} />
              )}
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
