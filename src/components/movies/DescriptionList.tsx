import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { scale } from "react-native-size-matters";
import ThemeContext from "@/themes/themeContext";

type DescriptionListProps = {
  title: string;
  description: string | number;
};

const DescriptionList = ({ title, description }: DescriptionListProps) => {
  const theme = useContext(ThemeContext);

  return (
    <View style={{ marginBottom: scale(10) }}>
      {title && (
        <Text
          style={{
            fontSize: scale(13),
            color: "#888",
            fontFamily: "PoppinsLight",
          }}
        >
          {title}
        </Text>
      )}

      {description && (
        <Text
          style={{
            fontSize: scale(12),
            color: theme?.color,
            fontFamily: "PoppinsLight",
          }}
        >
          {description || "none"}
        </Text>
      )}
    </View>
  );
};

export default DescriptionList;

const styles = StyleSheet.create({});
