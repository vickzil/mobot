import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import colors from "@/styles/colors";
import { scale } from "react-native-size-matters";
import ThemeContext from "@/themes/themeContext";
type SessionTitleProps = {
  title: string;
  fontSize?: number;
};

const SessionTitle: React.FC<SessionTitleProps> = ({
  title,
  fontSize = 15,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <View>
      <Text
        style={[
          {
            color: theme?.color,
            fontSize: scale(fontSize),
            lineHeight: scale(20),
            fontFamily: "PoppinsBold",
          },
          Platform.OS === "android" && {
            borderLeftWidth: 4,
            borderColor: colors.PRIMARY.yellow,
            paddingLeft: scale(10),
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

export default SessionTitle;

const styles = StyleSheet.create({});
