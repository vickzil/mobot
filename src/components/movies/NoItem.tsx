import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { scale } from "react-native-size-matters";
import ThemeContext from "../../themes/themeContext";
import CustomButton from "../custom/CustomButton";
import { RootState } from "@/store/store";

type NoItemProps = {
  text: string;
  color?: string;
  icon: string;
  des: string;
  buttonText?: string;
  onPress?: () => void;
};

const NoItem = ({
  text,
  color,
  icon = "",
  des,
  buttonText,
  onPress = () => {},
}: NoItemProps) => {
  const theme = useContext(ThemeContext);
  const { darkMode } = useSelector((state: RootState) => state.oauth);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: scale(50),
      }}
    >
      <View style={{ marginBottom: scale(10) }}>
        {icon && (
          <Icon
            name={icon}
            size={scale(78)}
            color={color ? color : theme?.color}
          />
        )}
      </View>
      {text && (
        <Text
          style={[
            {
              fontSize: scale(17),
              color: darkMode ? "#9EA3AE" : "#222",
              lineHeight: scale(22),
              marginTop: scale(10),
              fontFamily: "PoppinsMedium",
            },
          ]}
        >
          {text}
        </Text>
      )}

      {des && (
        <Text
          style={[
            {
              color: darkMode ? "#fff" : "#5D626D",
              marginBottom: scale(5),
              fontFamily: "PoppinsLight",
              fontSize: scale(13),
              textAlign: "center",
              marginTop: scale(6),
              paddingHorizontal: scale(30),
            },
          ]}
        >
          {des}
        </Text>
      )}
      {buttonText && (
        <View style={{ marginTop: scale(10), width: "60%" }}>
          <CustomButton
            title={buttonText}
            type="NORMAL"
            onPress={onPress}
            valid={true}
          />
        </View>
      )}
    </View>
  );
};

export default NoItem;

const styles = StyleSheet.create({});
