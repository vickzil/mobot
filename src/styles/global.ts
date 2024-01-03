import { StyleSheet } from "react-native";
import colors from "./colors";
import { scale } from "react-native-size-matters";
export const globalStyles = StyleSheet.create({
  heading: {
    fontSize: scale(20),
  },

  subHeading: {
    color: colors.PRIMARY.yellow,
  },

  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    borderBottomLeftRadius: scale(5),
    borderBottomRightRadius: scale(5),
    paddingBottom: scale(10),
  },

  searchInputGroup: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: scale(15),
    borderRadius: scale(14),
    borderWidth: 2,
    borderColor: "#EFF0F3",
  },

  searchIcon: {
    marginRight: scale(15),
  },

  searchInput: {
    fontSize: scale(14),
    width: "100%",
    paddingVertical: scale(16),
  },
});
