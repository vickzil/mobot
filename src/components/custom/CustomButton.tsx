import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../styles/colors";

import { scale } from "react-native-size-matters";
type ButtonProps = {
  title: string;
  valid: boolean;
  type?: string;
  color?: string;
  allCaps?: boolean;
  onPress: () => void;
};
const CustomButton = ({
  title,
  valid,
  onPress = () => {},
  type = "NORMAL",
  allCaps = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        type === "OUTLINE" ? styles.outlineButton : styles.normalButton,
        !valid && styles.isDisabled,
        {
          width: "100%",
          height: scale(40),
          borderRadius: scale(10),
          alignItems: "center",
          justifyContent: "center",
          marginTop: scale(10),
        },
      ]}
      onPress={onPress}
      disabled={valid === false}
      activeOpacity={0.7}
    >
      <Text
        style={[
          {
            color: type === "OUTLINE" ? colors.PRIMARY.yellow : "#111",
            fontWeight: "600",
            fontSize: scale(15),
            fontFamily: "Poppins",
          },
          allCaps && { textTransform: "uppercase" },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  normalButton: {
    backgroundColor: colors.PRIMARY.yellow,
  },

  outlineButton: {
    borderWidth: scale(1),
    borderColor: colors.PRIMARY.yellow,
  },

  isDisabled: {
    borderWidth: scale(1),
    backgroundColor: "#cce1b3",
    borderColor: "#cce1b3",
  },
});
