import { StyleSheet, TextInput, View } from "react-native";
import React, { useContext } from "react";
import { globalStyles } from "@/styles/global";
import ThemeContext from "@/themes/themeContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale } from "react-native-size-matters";

type SearchInputProps = {
  searchText: string;
  setsearchText: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput: React.FC<SearchInputProps> = ({
  searchText,
  setsearchText,
}) => {
  const theme = useContext(ThemeContext);
  const { darkMode } = useSelector((state: RootState) => state.oauth);

  return (
    <View style={[globalStyles.searchContainer]}>
      <View
        style={[
          globalStyles.searchInputGroup,
          darkMode && {
            backgroundColor: "#111",
            borderColor: "#444",
            borderWidth: 1,
          },
        ]}
      >
        <Ionicons
          name="search-outline"
          size={scale(20)}
          style={[globalStyles.searchIcon, { color: theme?.color }]}
        />

        <TextInput
          onChangeText={(text) => setsearchText(text)}
          value={searchText}
          style={[globalStyles.searchInput, { color: theme?.color }]}
          placeholder="Search "
          placeholderTextColor={darkMode ? "gray" : "#5D626D"}
        />
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({});
